
// show the dev tools by default
require('nw.gui').Window.get().showDevTools(null, function (_win) {
  // _win.resizeTo(800, 1000)
})

var Mocha = require('mocha')
var mocha = new Mocha
mocha.reporter('loca')
mocha.bail(true)
mocha.slow(1000)
mocha.timeout(1000*60*60)
// pass the browser context
mocha.suite.emit('pre-require', window, null, mocha)

// iframe onload callback
var page = {
  onload: null,
  load: function (cb) {
    page.onload = cb
  }
}

// iframe/shortcuts
var iframe = {jquery: null, window: null, self: null}
var $ = null, win = null
// database client
var client = null
// server process
var server = null

// misc
var spawn = require('child_process').spawn
var async = require('async')
var aw = require('ansi-webkit')
// db
var Client = require('./lib/client')
// mw
var express = require('express')
var admin = require('express-admin')
var config = require('./lib/config')

// ----------------------------------------------------------------------------

jQuery(() => {
  jQuery('body')
    .append(`<iframe id="iframe" src="http://localhost:${config.admin.port}/login"></iframe>`)

  jQuery('#iframe').on('load', function (e) {
    iframe = {
      jquery: this.contentWindow.$,
      window: this.contentWindow,
      self: this
    }
    // shortcuts
    $ = iframe.jquery
    win = iframe.window

    page.onload()
    // setTimeout(() => page.onload(), 3000)
  })

  // wait until the iframe is loaded
  page.load(() => {
    mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures)
      })
    })
  })
})

// ----------------------------------------------------------------------------

config.db.forEach((db) => {
  config.engine.forEach((engine) => {
    describe(`${engine} - ${db}`, () => {
      before((done) => {
        async.series([
          // start server
          (done) => {
            server = express()
              .use(admin({
                config: require(`${config.dpath}/config/${db}/${engine}/config.json`),
                settings: require(`${config.dpath}/config/${db}/${engine}/settings.json`),
                custom: require(`${config.dpath}/config/${db}/custom.json`),
                users: require(`${config.dpath}/config/${db}/users.json`),
              }))
              .listen(config.admin.port, () => {
                setTimeout(done, 500)
              })
          },
          // reload login page
          (done) => {
            win.location.reload()
            page.load(done)
          },
          // login
          (done) => {
            $('[name=username]').val(config.admin.user)
            $('[name=password]').val(config.admin.pass)
            $('[type=submit]').trigger('click')
            page.load(done)
          },
          // connect to database
          (done) => {
            var options = {
              mysql: {...config.mysql, database: db},
              pg: {...config.pg, database: db},
              sqlite: {database: `${config.dpath}/fixtures/${db}/${db}.sqlite`}
            }
            client = Client(engine)
            client.connect(options[engine], done)
          }
        ], done)
      })

      // load test suite
      if (/relationships/.test(db)) {
        config.test
          .filter((path) => path.includes('relationships'))
          .forEach((path) => {
            jQuery('head').append(`<script src="${path}"></script>`)
          })
      }
      else if (/data-types/.test(db) /*&& /pg/.test(engine)*/) {
        config.test
          .filter((path) => path.includes('data-types'))
          .forEach((path) => {
            jQuery('head').append(`<script src="${path}"></script>`)
          })
      }

      after((done) => {
        async.series([
          // logout
          (done) => {
            $('[href$="/logout"]')[0].click()
            page.load(done)
          },
          // disconnect from db
          (done) => {
            client.disconnect()
            done()
          },
          // close server
          (done) => {
            server.close(done)
          }
        ], done)
      })
    })
  })
})


// mocha setup
var should = chai.should();
mocha.suite._timeout = 1000 * 60 * 60;
mocha.setup({
    ui: 'bdd',
    bail: true,
    globals: ['']
});
// iframe onload callback
var page = {
    onload: null,
    load: function (cb) {
        page.onload = cb;
    }
};

// iframe/shortcuts
var iframe = {jquery:null, window:null, self:null};
var $ = null, win = null;
// database client
var client = null;
// server process
var server = null;

// misc
var spawn = require('child_process').spawn,
    async = require('async');
// 
var Client = require('./lib/client'),
    sql = require('./lib/sql');

var __dirname = '/home/mighty/node/modules/express-admin-tests';


jQuery(function () {
    jQuery('body')
        .append('<iframe id="iframe" src="http://admin/login"></iframe>');

    jQuery('#iframe').on('load', function (e) {
        iframe = {
            jquery: this.contentWindow.$,
            window: this.contentWindow,
            self: this
        };
        // shortcuts
        $ = iframe.jquery;
        win = iframe.window;

        page.onload();
        // setTimeout(function () {page.onload();}, 5000);
    });

    // wait until the iframe is loaded
    page.load(function () {
        mocha.run();
    });
});

['x-relationships-single'].forEach(function (db) {
    ['mysql', 'pg', 'sqlite'].forEach(function (engine) {
        describe(engine, function () {
            before(function (done) {
                async.series([
                    function (done) {
                        // start server
                        server = spawn('admin', ['config/'+db+'/'+engine]);
                        server.stdout.on('data', function (e) {
                            if (e.toString().trim().match(/Express Admin listening.*/))
                                done();
                        });
                    },
                    function (done) {
                        // reload login page
                        win.location.reload();
                        page.load(done);
                    },
                    function (done) {
                        // login
                        $('[name=username]').val('admin');
                        $('[name=password]').val('11aaAA');
                        $('[type=submit]').trigger('click');
                        page.load(done);
                    },
                    function (done) {
                        // connect to database
                        switch (engine) {
                            case 'mysql':
                                var options = {mysql:{
                                    database:db, user:'liolio', password:'karamba',
                                    multipleStatements:true}
                                }
                                break;
                            case 'pg':
                                var options = {pg:{
                                    database:db, user:'liolio', password:'karamba'}
                                }
                                break;
                            case 'sqlite':
                                var options = {sqlite:{
                                    database:__dirname+'/fixtures/'+db+'/'+db+'.sqlite'}
                                }
                                break;
                        }
                        client = new Client(options);
                        client.connect(options[engine], done);
                    }
                ], done);
            });

            // test suite

            // tests.login();

            // tests.otm1();
            // tests.otm2();

            tests.mtm1();
            tests.mtm2();

            after(function (done) {
                async.series([
                    function (done) {
                        // logout
                        $('[href="/logout"]')[0].click();
                        page.load(done);
                    },
                    function (done) {
                        // disconnect from db
                        client.disconnect();
                        done();
                    },
                    function (done) {
                        // close server process
                        server.kill('SIGHUP');
                        done();
                    }	
                ], done);
            });
        });
    });
});

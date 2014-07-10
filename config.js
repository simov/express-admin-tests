
// show the dev tools by default
require('nw.gui').Window.get().showDevTools().resizeTo(800, 1000);

var Mocha = require('mocha');
var mocha = new Mocha;
mocha.reporter('loca');
mocha.bail(true);
mocha.timeout(1000*60*60);
// pass the browser context
mocha.suite.emit('pre-require', window, null, mocha);

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
        // setTimeout(function () {page.onload()}, 3000);
    });

    // wait until the iframe is loaded
    page.load(function () {
        mocha.run(function (failures) {
            process.on('exit', function () {
                process.exit(failures);
            });
        });
    });
});

['x-relationships-single', 'x-relationships-compound', 'x-data-types'].forEach(function (db) {
    ['mysql', 'pg', 'sqlite'].forEach(function (engine) {
        describe(engine+' - '+db, function () {
            before(function (done) {
                async.series([
                    function (done) {
                        // start server
                        server = spawn('admin', [/*'-l',*/ 'config/'+db+'/'+engine]);
                        server.stdout.on('data', function (e) {
                            if (e.toString().trim().match(/Express Admin listening.*/))
                                done();
                            // else console.log(e.toString().trim());
                        });
                        server.stderr.on('data', function (e) {
                            console.log(e.toString().trim());
                        });
                    },
                    
                    // embedding
                    // function (done) {
                    // 	// start server
                    // 	server = spawn('node',
                    // 		['config/embedding/app.js', db, engine]);
                    // 	server.stdout.on('data', function (e) {
                    // 		if (e.toString().trim().match(/Express Admin listening.*/)) {
                    // 			win.location = 'http://localhost:3000/admin/login';
                    // 			page.load(done);
                    // 		}
                    // 		// else console.log(e.toString().trim());
                    // 	});
                    // 	server.stderr.on('data', function (e) {
                    // 		console.log(e.toString().trim());
                    // 	});
                    // },

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

            switch (true) {
                case (/relationships/.test(db)):
                    var file = '<script src="test/relationships/name.js"></script>';
                    jQuery('head').append(file.replace('name', 'otm1'));
                    jQuery('head').append(file.replace('name', 'otm2'));

                    jQuery('head').append(file.replace('name', 'mtm1'));
                    jQuery('head').append(file.replace('name', 'mtm2'));

                    jQuery('head').append(file.replace('name', 'tbl'));
                    jQuery('head').append(file.replace('name', 'filter'));
                    jQuery('head').append(file.replace('name', 'edit'));
                    break;
                case (/data-types/.test(db) /*&& /pg/.test(engine)*/):
                    var file = '<script src="test/data-types/name.js"></script>';
                    jQuery('head').append(file.replace('name', 'otm'));
                    jQuery('head').append(file.replace('name', 'mtm'));
                    jQuery('head').append(file.replace('name', 'tbl'));
                    break;
            }
            
            after(function (done) {
                async.series([
                    function (done) {
                        // logout
                        $('[href$="/logout"]')[0].click();
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

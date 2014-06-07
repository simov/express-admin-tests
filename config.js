
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
        // setTimeout(function () {page.onload();}, 3000);
    });

    // wait until the iframe is loaded
    page.load(function () {
        mocha.run();
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
                    tests.relationships.otm1();
                    tests.relationships.otm2();

                    tests.relationships.mtm1();
                    tests.relationships.mtm2();

                    tests.relationships.tbl();
                    tests.relationships.filter();
                    tests.relationships.edit();
                    break;
                case (/data-types/.test(db) && /pg/.test(engine)):
                    // sql.pg.truncate is broken!
                    // tests.types.otm();
                    // tests.types.mtm();
                    break;
            }
            
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

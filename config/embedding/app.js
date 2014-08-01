
var path = require('path');
var express = require('express');


var xAdmin = require('express-admin');
var dpath = path.resolve(__dirname, '../', process.argv[2], process.argv[3]);

var args = {
    dpath: dpath,
    config: require(path.join(dpath, 'config.json')),
    settings: require(path.join(dpath, 'settings.json')),
    custom: require(path.join(dpath, 'custom.json')),
    users: require(path.join(dpath, 'users.json'))
};
args.config.app.root = '/admin';

xAdmin.init(args, function (err, admin) {
    if (err) return console.log(err);

    // express 3.4.4
    var app = express()
        .use('/admin', admin)
        .use(express.bodyParser())
        .use(express.cookieParser())
        .use(express.session({key: 'embed-app', secret: 'secret'}))
        .use(express.csrf())
        .use(express.methodOverride())
        .use(express.static(__dirname));

    app.get('/', function (req, res) {
        res.send('Hello World');
    });

    app.listen(3000, function () {
        console.log('Express Admin listening on port 3000');
    });
});


if (!process.argv[2])
    return console.log('Specify schema file to import!');
var dbname = process.argv[2];

var fs = require('fs');
    path = require('path');

// fixtures/dbname/dbname.sqlite
if (fs.existsSync(path.join(__dirname, dbname, dbname+'.sqlite')))
    fs.unlinkSync(path.join(__dirname, dbname, dbname+'.sqlite'));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, dbname, dbname+'.sqlite'));

var schema = fs.readFileSync(path.join(__dirname, dbname, 'sqlite.sql'), 'utf8');

db.serialize(function() {
    db.exec(schema);
});

db.close();
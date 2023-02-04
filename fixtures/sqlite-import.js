
var fs = require('fs')
var path = require('path')
var sqlite3 = require('sqlite3').verbose()

var name = process.argv[2]

if (!name) {
  console.log('Specify database name to import!')
  process.exit()
}

var dpath = path.resolve(__dirname, name)
var db = path.join(dpath, `${name}.sqlite`)
var schema = fs.readFileSync(path.join(dpath, 'sqlite.sql'), 'utf8')

if (fs.existsSync(db)) {
  fs.unlinkSync(db)
}

var connection = new sqlite3.Database(db)

connection.serialize(() => {
  connection.exec(schema)
})

connection.close()


// var sql = require('./sql')
// var query = require('./query')


// https://github.com/mysqljs/mysql
function MySql () {
  try {
    var client = require('mysql')
  }
  catch (err) {
    throw Error('The `mysql` module was not found')
  }
  var connection = null

  var connect = (options, done) => {
    connection = client.createConnection(options)
    connection.connect((err) => {
      if (err) return done(err)
      done()
    })
  }

  var query = (sql, done) => {
    connection.query(sql, (err, rows) => {
      if (err) return done(err)
      done(null, rows)
    })
  }

  var truncate = (table, done) => {
    var sql =
      'SET FOREIGN_KEY_CHECKS=0;\
      truncate table `'+table+'`;\
      SET FOREIGN_KEY_CHECKS=1;'
    query(sql, done)
  }

  var disconnect = () => {
    connection.destroy()
  }

  return {
    connect,
    truncate,
    disconnect,
  }
}

// https://github.com/brianc/node-postgres
function PostgreSQL () {
  try {
    var client = require('pg')
  }
  catch (err) {
    throw Error('The `pg` module was not found')
  }
  var connection = null

  var connect = (options, done) => {
    connection = new client.Client(options)
    connection.connect((err) => {
      if (err) return done(err)
      done()
    })
  }

  var query = (sql, done) => {
    connection.query(sql, (err, result) => {
      if (err) return done(err)
      if (result.command == 'INSERT' && result.rows.length) {
        var obj = result.rows[0]
        var key = Object.keys(obj)[0]
        result.insertId = obj[key]
        return done(null, result)
      }
      // select
      done(null, result.rows)
    })
  }

  var truncate = (table, done, schema) => {
    var sql = 'truncate table "'+(schema||'public')+'"."'+table+'" restart identity cascade;'
    query(sql, done)
  }

  var disconnect = () => {
    connection.end()
  }

  return {
    connect,
    truncate,
    disconnect,
  }
}

// https://github.com/TryGhost/node-sqlite3
function SQLite () {
  try {
    var client = require('sqlite3')
  }
  catch (err) {
    throw new Error('The `sqlite3` module was not found')
  }
  var connection = null

  var connect = (options, done) => {
    connection = new client.Database(options.database)
    done()
  }

  var query = (sql, done) => {
    if (/^(insert|update|delete)/i.test(sql)) {
      connection.run(sql, function (err) {
        if (err) return done(err)
        done(null, {insertId: this.lastID})
      })
    }
    else {
      connection.all(sql, function (err, rows) {
        if (err) return done(err)
        done(null, rows)
      })
    }
  }

  var truncate = (table, done) => {
    var sql = "delete from `"+table+"`;\
      delete from SQLITE_SEQUENCE where name='"+table+"';"
    query(sql, done)
  }

  var disconnect = () => {
    connection.close()
  }

  return {
    connect,
    truncate,
    disconnect,
  }
}

module.exports = (engine) =>
  engine === 'mysql' ? new MySql() :
  engine === 'pg' ? new PostgreSQL() :
  engine === 'sqlite' ? new SQLite() :
  null

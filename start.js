
var express = require('express')
var admin = require('express-admin')

var db =
  'x-relationships-single'
  // 'x-relationships-compound'
  // 'x-data-types'

var engine =
  'mysql'
  // 'pg'
  // 'sqlite'

express()
  .use(admin({
    config: require(`./config/${db}/${engine}/config.json`),
    settings: require(`./config/${db}/${engine}/settings.json`),
    custom: require(`./config/${db}/custom.json`),
    users: require(`./config/${db}/users.json`),
  }))
  .listen(3000)


var fs = require('fs')
var path = require('path')

;[
  'config/x-relationships-single/mysql/config.json',
  'config/x-relationships-single/pg/config.json',
  'config/x-relationships-single/sqlite/config.json',
  'config/x-relationships-single/custom.json',

  'config/x-relationships-compound/mysql/config.json',
  'config/x-relationships-compound/pg/config.json',
  'config/x-relationships-compound/sqlite/config.json',
  'config/x-relationships-compound/custom.json',

  'config/x-data-types/mysql/config.json',
  'config/x-data-types/pg/config.json',
  'config/x-data-types/sqlite/config.json',
  'config/x-data-types/custom.json',

  'lib/config.js',
].forEach((file) => {
  var fpath = path.resolve(__dirname, file)
  fs.writeFileSync(
    fpath,
    fs.readFileSync(fpath, 'utf8')
      .replace(/\/home\/s\/git\/express-admin-tests/g, __dirname),
    'utf8')
})

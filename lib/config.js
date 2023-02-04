
module.exports = {
  dpath: '/home/s/git/express-admin-tests',
  engine: [
    'mysql',
    'pg',
    'sqlite',
  ],
  db: [
    'x-relationships-single',
    'x-relationships-compound',
    'x-data-types',
  ],
  test: [
    'test/relationships/otm1.js',
    'test/relationships/otm2.js',
    'test/relationships/mtm1.js',
    'test/relationships/mtm2.js',
    'test/relationships/tbl.js',
    'test/relationships/filter.js',
    'test/relationships/edit.js',

    'test/data-types/otm.js',
    'test/data-types/mtm.js',
    'test/data-types/tbl.js',
    'test/data-types/selfref.js',
  ],
  mysql: {
    database: '',
    user: 'root',
    password: 'x-admin',
    port: 8123,
    multipleStatements: true,
  },
  pg: {
    database: '',
    user: 'postgres',
    password: 'x-admin',
    port: 8234,
  },
  sqlite: {
    database: '',
  },
  admin: {
    user: 'admin',
    pass: '1234abCD',
    port: 3000,
  },
}

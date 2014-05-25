
# Express Admin Tests
Integration tests for [Express Admin][0]

#### Import
_x-relationships-single_, _x-relationships-compound_
```bash
$ mysql -p --user=root 'x-relationships-single' < fixtures/x-relationships-single/mysql.sql
$ sudo -u postgres psql 'x-relationships-single' < fixtures/x-relationships-single/pg.sql
$ node fixtures/sqlite-import.js x-relationships-single
```

#### Install
```bash
$ npm install
$ cd node_modules/pg
$ nw-gyp rebuild --target=0.8.6 # node-webkit version
$ cd node_modules/sqlite3
$ node-pre-gyp build --runtime=node-webkit --target=0.8.6 
$ nw .
```

  [0]: https://github.com/simov/express-admin

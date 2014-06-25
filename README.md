
# Express Admin Tests
System tests for [Express Admin][0]

#### Database
_x-relationships-single_, _x-relationships-compound_, _x-data-types_
```sql
-- mysql
create schema `x-relationships-single` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
-- pg
create database "x-relationships-single";
```

#### Import
```bash
$ mysql -p --user=root 'x-relationships-single' < fixtures/x-relationships-single/mysql.sql
$ sudo -u postgres psql 'x-relationships-single' < fixtures/x-relationships-single/pg.sql
$ node fixtures/sqlite-import.js x-relationships-single
```

#### Grants
```sql
-- mysql
grant all on `x-relationships-single`.* to liolio@localhost ;
-- pg
\c "x-relationships-single"
grant all on database "x-relationships-single" to liolio;
grant all on schema "public" to liolio;
grant all on all tables in schema "public" to liolio;
grant all on all sequences in schema "public" to liolio;
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

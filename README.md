
# Express Admin Tests

> _Integration tests for [Express Admin]_

## Environment

- node >= 14
- npm
- docker
- docker-compose
- nw

## MySQL

```bash
# start MySQL database server (pick one)
docker-compose up mysql
docker-compose up mysql5
docker-compose up mariadb
# login to the running container (pick one)
docker exec -it x-admin-mysql bash
docker exec -it x-admin-mysql-5 bash
docker exec -it x-admin-mariadb bash
# login to mysql
mysql -u root -p
```
```sql
-- create database
create schema `x-relationships-single` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
create schema `x-relationships-compound` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
create schema `x-data-types` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
```
```bash
# import schema
mysql -p --user=root 'x-relationships-single' < fixtures/x-relationships-single/mysql.sql
mysql -p --user=root 'x-relationships-compound' < fixtures/x-relationships-compound/mysql.sql
mysql -p --user=root 'x-data-types' < fixtures/x-data-types/mysql.sql
```

## PostgreSQL

```bash
# start PostgreSQL database server (pick one)
docker-compose up pg
docker-compose up pg9
# login to the running container (pick one)
docker exec -it x-admin-pg bash
docker exec -it x-admin-pg-9 bash
# login to psql
psql -U postgres
```
```sql
# create database
create database "x-relationships-single";
create database "x-relationships-compound";
create database "x-data-types";
```
```bash
# import schema
psql -U postgres 'x-relationships-single' < fixtures/x-relationships-single/pg.sql
psql -U postgres 'x-relationships-compound' < fixtures/x-relationships-compound/pg.sql
psql -U postgres 'x-data-types' < fixtures/x-data-types/pg.sql
```

## SQLite

```bash
# create database and import schema
node fixtures/sqlite-import.js x-relationships-single
node fixtures/sqlite-import.js x-relationships-compound
node fixtures/sqlite-import.js x-data-types
```

## Tests

Download [NW.js](https://nwjs.io/) - [v0.32.1](https://dl.nwjs.io/v0.32.1/nwjs-sdk-v0.32.1-linux-x64.tar.gz)

```bash
# extract the folder and add it to your path
export PATH=$PATH:$HOME/software/nwjs-sdk-v0.32.1-linux-x64:$PATH
```

Clone this repo and:

```bash
# install test dependencies
npm install
# update absolute paths set inside the config folder
node path.js
# run test suite
nw .
```

Run a configuration locally:

```bash
# pick a database and engine and start the admin
node start.js
```

## Diagrams

[MySQL Workbench] can be used to preview the [database diagrams].


  [Express Admin]: https://github.com/simov/express-admin
  [MySQL Workbench]: https://www.mysql.com/products/workbench/
  [database diagrams]: https://github.com/simov/express-admin-examples/blob/master/fixtures/

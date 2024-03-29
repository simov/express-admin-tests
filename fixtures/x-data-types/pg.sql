-- -----------------------------------------------------
-- Create schemas
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS "x";
CREATE SCHEMA IF NOT EXISTS "y";

-- -----------------------------------------------------
-- Drop mtm contraints
-- -----------------------------------------------------

ALTER TABLE "x"."tbl_has_mtm" DROP CONSTRAINT "tbl_id";
ALTER TABLE "x"."tbl_has_mtm" DROP CONSTRAINT "mtm_id";

ALTER TABLE "x"."mto_has_mtm" DROP CONSTRAINT "mto_id";
ALTER TABLE "x"."mto_has_mtm" DROP CONSTRAINT "mtm_id";

-- -----------------------------------------------------
-- Drop otm contraints
-- -----------------------------------------------------

ALTER TABLE "x"."tbl" DROP CONSTRAINT "otm_id";

ALTER TABLE "x"."mto" DROP CONSTRAINT "otm_id";

-- -----------------------------------------------------
-- Drop mto contraints
-- -----------------------------------------------------

ALTER TABLE "x"."mto" DROP CONSTRAINT "tbl_id";


-- -----------------------------------------------------
-- Table "otm"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "y"."otm" ;

CREATE TABLE IF NOT EXISTS "y"."otm" (
  "id" SERIAL NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "tbl"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "x"."tbl" ;

CREATE TABLE IF NOT EXISTS "x"."tbl" (
  "id" VARCHAR(45) NOT NULL,
  "otm_id" INT NOT NULL,
  "static" VARCHAR(45) NOT NULL,
  "text" VARCHAR(45) NOT NULL,
  "boolean" BOOLEAN NOT NULL,
  "int" INT NOT NULL,
  "decimal" DECIMAL(4,2) NOT NULL,
  "upload" VARCHAR(45) NOT NULL,
  "binary" BYTEA NULL,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "datetime" TIMESTAMP NOT NULL,
  "year" INT NOT NULL,
  "textarea" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "otm_id"
    FOREIGN KEY ("otm_id")
    REFERENCES "y"."otm" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "x"."mto" ;

CREATE TABLE IF NOT EXISTS "x"."mto" (
  "id" VARCHAR(45) NOT NULL,
  "tbl_id" VARCHAR(45) NOT NULL,
  "otm_id" INT NULL,
  "static" VARCHAR(45) NULL,
  "text" VARCHAR(45) NULL,
  "boolean" BOOLEAN NULL,
  "int" INT NULL,
  "decimal" DECIMAL(4,2) NULL,
  "upload" VARCHAR(45) NULL,
  "binary" BYTEA NULL,
  "date" DATE NULL,
  "time" TIME NULL,
  "datetime" TIMESTAMP NULL,
  "year" INT NULL,
  "textarea" TEXT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "x"."tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm_id"
    FOREIGN KEY ("otm_id")
    REFERENCES "y"."otm" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mtm"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "y"."mtm" ;

CREATE TABLE IF NOT EXISTS "y"."mtm" (
  "id" SERIAL NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  "name2" INT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "tbl_has_mtm"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "x"."tbl_has_mtm" ;

CREATE TABLE IF NOT EXISTS "x"."tbl_has_mtm" (
  "tbl_id" VARCHAR(45) NOT NULL,
  "mtm_id" INT NOT NULL,
  PRIMARY KEY ("tbl_id", "mtm_id"),
  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "x"."tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm_id"
    FOREIGN KEY ("mtm_id")
    REFERENCES "y"."mtm" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto_has_mtm"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "x"."mto_has_mtm" ;

CREATE TABLE IF NOT EXISTS "x"."mto_has_mtm" (
  "mto_id" VARCHAR(45) NOT NULL,
  "mtm_id" INT NOT NULL,
  PRIMARY KEY ("mto_id", "mtm_id"),
  CONSTRAINT "mto_id"
    FOREIGN KEY ("mto_id")
    REFERENCES "x"."mto" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm_id"
    FOREIGN KEY ("mtm_id")
    REFERENCES "y"."mtm" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "self_ref"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "x"."self_ref" ;

CREATE TABLE IF NOT EXISTS "x"."self_ref" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "parent" INT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Grants
-- -----------------------------------------------------
grant all on database "x-data-types" to postgres;

grant all on schema "x" to postgres;
grant all on all tables in schema "x" to postgres;
grant all on all sequences in schema "x" to postgres;

grant all on schema "y" to postgres;
grant all on all tables in schema "y" to postgres;
grant all on all sequences in schema "y" to postgres;


-- -----------------------------------------------------
-- Owner
-- -----------------------------------------------------
alter table "x"."tbl" owner to postgres;
alter table "x"."tbl_has_mtm" owner to postgres;
alter table "x"."mto" owner to postgres;
alter table "x"."mto_has_mtm" owner to postgres;
alter table "x"."self_ref" owner to postgres;

alter table "y"."otm" owner to postgres;
alter table "y"."mtm" owner to postgres;

alter sequence "x"."self_ref_id_seq" owner to postgres;

alter sequence "y"."otm_id_seq" owner to postgres;
alter sequence "y"."mtm_id_seq" owner to postgres;

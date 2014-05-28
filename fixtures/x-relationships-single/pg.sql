
-- -----------------------------------------------------
-- Drop mtm contraints
-- -----------------------------------------------------

ALTER TABLE "tbl_has_mtm1" DROP CONSTRAINT "tbl_id";
ALTER TABLE "tbl_has_mtm1" DROP CONSTRAINT "mtm1_id";
ALTER TABLE "tbl_has_mtm2" DROP CONSTRAINT "tbl_id";
ALTER TABLE "tbl_has_mtm2" DROP CONSTRAINT "mtm2_id";

ALTER TABLE "mto1_has_mtm1" DROP CONSTRAINT "mto1_id";
ALTER TABLE "mto1_has_mtm1" DROP CONSTRAINT "mtm1_id";
ALTER TABLE "mto1_has_mtm2" DROP CONSTRAINT "mto1_id";
ALTER TABLE "mto1_has_mtm2" DROP CONSTRAINT "mtm2_id";

ALTER TABLE "mto2_has_mtm1" DROP CONSTRAINT "mto2_id";
ALTER TABLE "mto2_has_mtm1" DROP CONSTRAINT "mtm1_id";
ALTER TABLE "mto2_has_mtm2" DROP CONSTRAINT "mto2_id";
ALTER TABLE "mto2_has_mtm2" DROP CONSTRAINT "mtm2_id";

-- -----------------------------------------------------
-- Drop otm contraints
-- -----------------------------------------------------

ALTER TABLE "tbl" DROP CONSTRAINT "otm1_id";
ALTER TABLE "tbl" DROP CONSTRAINT "otm2_id";

ALTER TABLE "mto1" DROP CONSTRAINT "otm1_id";
ALTER TABLE "mto1" DROP CONSTRAINT "otm2_id";

ALTER TABLE "mto2" DROP CONSTRAINT "otm1_id";
ALTER TABLE "mto2" DROP CONSTRAINT "otm2_id";

-- -----------------------------------------------------
-- Drop mto contraints
-- -----------------------------------------------------

ALTER TABLE "mto1" DROP CONSTRAINT "tbl_id";
ALTER TABLE "mto2" DROP CONSTRAINT "tbl_id";


-- -----------------------------------------------------
-- Table "otm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "otm1" ;
CREATE SEQUENCE otm1_id_seq;
ALTER SEQUENCE otm1_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "otm1" (
  "id" INT NOT NULL DEFAULT nextval('otm1_id_seq'),
  "name1" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "otm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "otm2" ;
CREATE SEQUENCE otm2_id_seq;
ALTER SEQUENCE otm2_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "otm2" (
  "id" INT NOT NULL DEFAULT nextval('otm2_id_seq'),
  "name1" VARCHAR(45) NOT NULL,
  "name2" INT NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "tbl"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl" ;
CREATE SEQUENCE tbl_id_seq;
ALTER SEQUENCE tbl_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "tbl" (
  "id" INT NOT NULL DEFAULT nextval('tbl_id_seq'),
  "otm1_id" INT NOT NULL,
  "otm2_id" INT NOT NULL,
  PRIMARY KEY ("id"),

  CONSTRAINT "otm1_id"
    FOREIGN KEY ("otm1_id")
    REFERENCES "otm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id"
    FOREIGN KEY ("otm2_id")
    REFERENCES "otm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mtm1" ;
CREATE SEQUENCE mtm1_id_seq;
ALTER SEQUENCE mtm1_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mtm1" (
  "id" INT NOT NULL DEFAULT nextval('mtm1_id_seq'),
  "name1" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mtm2" ;
CREATE SEQUENCE mtm2_id_seq;
ALTER SEQUENCE mtm2_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mtm2" (
  "id" INT NOT NULL DEFAULT nextval('mtm2_id_seq'),
  "name1" VARCHAR(45) NOT NULL,
  "name2" INT NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "mto1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1" ;
CREATE SEQUENCE mto1_id_seq;
ALTER SEQUENCE mto1_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mto1" (
  "id" INT NOT NULL DEFAULT nextval('mto1_id_seq'),
  "tbl_id" INT NOT NULL,
  "otm1_id" INT NOT NULL,
  "otm2_id" INT NOT NULL,
  PRIMARY KEY ("id"),

  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm1_id"
    FOREIGN KEY ("otm1_id")
    REFERENCES "otm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id"
    FOREIGN KEY ("otm2_id")
    REFERENCES "otm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2" ;
CREATE SEQUENCE mto2_id_seq;
ALTER SEQUENCE mto2_id_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mto2" (
  "id" INT NOT NULL DEFAULT nextval('mto2_id_seq'),
  "tbl_id" INT NOT NULL,
  "otm1_id" INT NOT NULL,
  "otm2_id" INT NOT NULL,
  PRIMARY KEY ("id"),

  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm1_id"
    FOREIGN KEY ("otm1_id")
    REFERENCES "otm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id"
    FOREIGN KEY ("otm2_id")
    REFERENCES "otm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tbl_has_mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "tbl_has_mtm1" (
  "tbl_id" INT NOT NULL,
  "mtm1_id" INT NOT NULL,
  PRIMARY KEY ("tbl_id", "mtm1_id"),

  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id"
    FOREIGN KEY ("mtm1_id")
    REFERENCES "mtm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tbl_has_mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "tbl_has_mtm2" (
  "tbl_id" INT NOT NULL,
  "mtm2_id" INT NOT NULL,
  PRIMARY KEY ("tbl_id", "mtm2_id"),

  CONSTRAINT "tbl_id"
    FOREIGN KEY ("tbl_id")
    REFERENCES "tbl" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id"
    FOREIGN KEY ("mtm2_id")
    REFERENCES "mtm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto1_has_mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "mto1_has_mtm1" (
  "mto1_id" INT NOT NULL,
  "mtm1_id" INT NOT NULL,
  PRIMARY KEY ("mto1_id", "mtm1_id"),

  CONSTRAINT "mto1_id"
    FOREIGN KEY ("mto1_id")
    REFERENCES "mto1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id"
    FOREIGN KEY ("mtm1_id")
    REFERENCES "mtm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto1_has_mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "mto1_has_mtm2" (
  "mto1_id" INT NOT NULL,
  "mtm2_id" INT NOT NULL,
  PRIMARY KEY ("mto1_id", "mtm2_id"),

  CONSTRAINT "mto1_id"
    FOREIGN KEY ("mto1_id")
    REFERENCES "mto1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id"
    FOREIGN KEY ("mtm2_id")
    REFERENCES "mtm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2_has_mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "mto2_has_mtm1" (
  "mto2_id" INT NOT NULL,
  "mtm1_id" INT NOT NULL,
  PRIMARY KEY ("mto2_id", "mtm1_id"),

  CONSTRAINT "mto2_id"
    FOREIGN KEY ("mto2_id")
    REFERENCES "mto2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id"
    FOREIGN KEY ("mtm1_id")
    REFERENCES "mtm1" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2_has_mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "mto2_has_mtm2" (
  "mto2_id" INT NOT NULL,
  "mtm2_id" INT NOT NULL,
  PRIMARY KEY ("mto2_id", "mtm2_id"),
  
  CONSTRAINT "mto2_id"
    FOREIGN KEY ("mto2_id")
    REFERENCES "mto2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id"
    FOREIGN KEY ("mtm2_id")
    REFERENCES "mtm2" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

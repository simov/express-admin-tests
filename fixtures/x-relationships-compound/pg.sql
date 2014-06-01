
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
CREATE SEQUENCE otm1_id1_seq;
ALTER SEQUENCE otm1_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "otm1" (
  "id1" INT NOT NULL DEFAULT nextval('otm1_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id1", "id2"));


-- -----------------------------------------------------
-- Table "otm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "otm2" ;
CREATE SEQUENCE otm2_id1_seq;
ALTER SEQUENCE otm2_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "otm2" (
  "id1" INT NOT NULL DEFAULT nextval('otm2_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  "name2" INT NOT NULL,
  PRIMARY KEY ("id1", "id2"));


-- -----------------------------------------------------
-- Table "mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mtm1" ;
CREATE SEQUENCE mtm1_id1_seq;
ALTER SEQUENCE mtm1_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mtm1" (
  "id1" INT NOT NULL DEFAULT nextval('mtm1_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id1", "id2"));


-- -----------------------------------------------------
-- Table "mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mtm2" ;
CREATE SEQUENCE mtm2_id1_seq;
ALTER SEQUENCE mtm2_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mtm2" (
  "id1" INT NOT NULL DEFAULT nextval('mtm2_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "name1" VARCHAR(45) NOT NULL,
  "name2" INT NOT NULL,
  PRIMARY KEY ("id1", "id2"));


-- -----------------------------------------------------
-- Table "tbl"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl" ;
CREATE SEQUENCE tbl_id1_seq;
ALTER SEQUENCE tbl_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "tbl" (
  "id1" INT NOT NULL DEFAULT nextval('tbl_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "otm1_id1" INT NOT NULL,
  "otm1_id2" VARCHAR(45) NOT NULL,
  "otm2_id1" INT NOT NULL,
  "otm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id1", "id2"),

  CONSTRAINT "otm1_id1"
    FOREIGN KEY ("otm1_id1" , "otm1_id2")
    REFERENCES "otm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id1"
    FOREIGN KEY ("otm2_id1" , "otm2_id2")
    REFERENCES "otm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1" ;
CREATE SEQUENCE mto1_id1_seq;
ALTER SEQUENCE mto1_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mto1" (
  "id1" INT NOT NULL DEFAULT nextval('mto1_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "tbl_id1" INT NOT NULL,
  "tbl_id2" VARCHAR(45) NOT NULL,
  "otm1_id1" INT NOT NULL,
  "otm1_id2" VARCHAR(45) NOT NULL,
  "otm2_id1" INT NOT NULL,
  "otm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id1", "id2"),

  CONSTRAINT "otm1_id1"
    FOREIGN KEY ("otm1_id1" , "otm1_id2")
    REFERENCES "otm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id1"
    FOREIGN KEY ("otm2_id1" , "otm2_id2")
    REFERENCES "otm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "tbl_id1"
    FOREIGN KEY ("tbl_id1" , "tbl_id2")
    REFERENCES "tbl" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2" ;
CREATE SEQUENCE mto2_id1_seq;
ALTER SEQUENCE mto2_id1_seq owner TO liolio;

CREATE TABLE IF NOT EXISTS "mto2" (
  "id1" INT NOT NULL DEFAULT nextval('mto2_id1_seq'),
  "id2" VARCHAR(45) NOT NULL,
  "tbl_id1" INT NOT NULL,
  "tbl_id2" VARCHAR(45) NOT NULL,
  "otm1_id1" INT NOT NULL,
  "otm1_id2" VARCHAR(45) NOT NULL,
  "otm2_id1" INT NOT NULL,
  "otm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id1", "id2"),

  CONSTRAINT "otm1_id1"
    FOREIGN KEY ("otm1_id1" , "otm1_id2")
    REFERENCES "otm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "otm2_id1"
    FOREIGN KEY ("otm2_id1" , "otm2_id2")
    REFERENCES "otm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "tbl_id1"
    FOREIGN KEY ("tbl_id1" , "tbl_id2")
    REFERENCES "tbl" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tbl_has_mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "tbl_has_mtm1" (
  "tbl_id1" INT NOT NULL,
  "tbl_id2" VARCHAR(45) NOT NULL,
  "mtm1_id1" INT NOT NULL,
  "mtm1_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("tbl_id1", "tbl_id2", "mtm1_id1", "mtm1_id2"),

  CONSTRAINT "tbl_id1"
    FOREIGN KEY ("tbl_id1" , "tbl_id2")
    REFERENCES "tbl" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id1"
    FOREIGN KEY ("mtm1_id1" , "mtm1_id2")
    REFERENCES "mtm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tbl_has_mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tbl_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "tbl_has_mtm2" (
  "tbl_id1" INT NOT NULL,
  "tbl_id2" VARCHAR(45) NOT NULL,
  "mtm2_id1" INT NOT NULL,
  "mtm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("tbl_id1", "tbl_id2", "mtm2_id1", "mtm2_id2"),

  CONSTRAINT "tbl_id1"
    FOREIGN KEY ("tbl_id1" , "tbl_id2")
    REFERENCES "tbl" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id1"
    FOREIGN KEY ("mtm2_id1" , "mtm2_id2")
    REFERENCES "mtm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto1_has_mtm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "mto1_has_mtm1" (
  "mto1_id1" INT NOT NULL,
  "mto1_id2" VARCHAR(45) NOT NULL,
  "mtm1_id1" INT NOT NULL,
  "mtm1_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("mto1_id1", "mto1_id2", "mtm1_id1", "mtm1_id2"),

  CONSTRAINT "mto1_id1"
    FOREIGN KEY ("mto1_id1" , "mto1_id2")
    REFERENCES "mto1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id1"
    FOREIGN KEY ("mtm1_id1" , "mtm1_id2")
    REFERENCES "mtm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto1_has_mtm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto1_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "mto1_has_mtm2" (
  "mto1_id1" INT NOT NULL,
  "mto1_id2" VARCHAR(45) NOT NULL,
  "mtm2_id1" INT NOT NULL,
  "mtm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("mto1_id1", "mto1_id2", "mtm2_id1", "mtm2_id2"),

  CONSTRAINT "mto1_id1"
    FOREIGN KEY ("mto1_id1" , "mto1_id2")
    REFERENCES "mto1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id1"
    FOREIGN KEY ("mtm2_id1" , "mtm2_id2")
    REFERENCES "mtm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2_has_otm1"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2_has_mtm1" ;

CREATE TABLE IF NOT EXISTS "mto2_has_mtm1" (
  "mto2_id1" INT NOT NULL,
  "mto2_id2" VARCHAR(45) NOT NULL,
  "mtm1_id1" INT NOT NULL,
  "mtm1_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("mto2_id1", "mto2_id2", "mtm1_id1", "mtm1_id2"),

  CONSTRAINT "mto2_id1"
    FOREIGN KEY ("mto2_id1" , "mto2_id2")
    REFERENCES "mto2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm1_id1"
    FOREIGN KEY ("mtm1_id1" , "mtm1_id2")
    REFERENCES "mtm1" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "mto2_has_otm2"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "mto2_has_mtm2" ;

CREATE TABLE IF NOT EXISTS "mto2_has_mtm2" (
  "mto2_id1" INT NOT NULL,
  "mto2_id2" VARCHAR(45) NOT NULL,
  "mtm2_id1" INT NOT NULL,
  "mtm2_id2" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("mto2_id1", "mto2_id2", "mtm2_id1", "mtm2_id2"),

  CONSTRAINT "mto2_id1"
    FOREIGN KEY ("mto2_id1" , "mto2_id2")
    REFERENCES "mto2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "mtm2_id1"
    FOREIGN KEY ("mtm2_id1" , "mtm2_id2")
    REFERENCES "mtm2" ("id1" , "id2")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

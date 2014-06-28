
-- -----------------------------------------------------
-- Table `otm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm` ;

CREATE TABLE IF NOT EXISTS `otm` (
  `name1` VARCHAR(45) NOT NULL);


-- -----------------------------------------------------
-- Table `tbl`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl` ;

CREATE TABLE IF NOT EXISTS `tbl` (
  `id` VARCHAR(45) NOT NULL,
  `otm_id` INT NOT NULL,
  `static` VARCHAR(45) NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `boolean` TINYINT(1) NOT NULL,
  `int` INT NOT NULL,
  `decimal` DECIMAL(4,2) NOT NULL,
  `upload` VARCHAR(45) NOT NULL,
  `binary` BLOB NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `datetime` DATETIME NOT NULL,
  `year` YEAR NOT NULL,
  `textarea` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tbl_otm`
    FOREIGN KEY (`otm_id`)
    REFERENCES `otm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto` ;

CREATE TABLE IF NOT EXISTS `mto` (
  `id` VARCHAR(45) NOT NULL,
  `tbl_id` VARCHAR(45) NOT NULL,
  `otm_id` INT NULL,
  `static` VARCHAR(45) NULL,
  `text` VARCHAR(45) NULL,
  `boolean` TINYINT(1) NULL,
  `int` INT NULL,
  `decimal` DECIMAL(4,2) NULL,
  `upload` VARCHAR(45) NULL,
  `binary` BLOB NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `datetime` DATETIME NULL,
  `year` YEAR NULL,
  `textarea` TEXT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mto_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto_otm1`
    FOREIGN KEY (`otm_id`)
    REFERENCES `otm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm` ;

CREATE TABLE IF NOT EXISTS `mtm` (
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NULL);


-- -----------------------------------------------------
-- Table `tbl_has_mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm` (
  `tbl_id` VARCHAR(45) NOT NULL,
  `mtm_id` INT NOT NULL,
  PRIMARY KEY (`tbl_id`, `mtm_id`),
  CONSTRAINT `fk_tbl_has_mtm_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm_mtm1`
    FOREIGN KEY (`mtm_id`)
    REFERENCES `mtm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto_has_mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto_has_mtm` ;

CREATE TABLE IF NOT EXISTS `mto_has_mtm` (
  `mto_id` VARCHAR(45) NOT NULL,
  `mtm_id` INT NOT NULL,
  PRIMARY KEY (`mto_id`, `mtm_id`),
  CONSTRAINT `fk_mto_has_mtm_mto1`
    FOREIGN KEY (`mto_id`)
    REFERENCES `mto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto_has_mtm_mtm1`
    FOREIGN KEY (`mtm_id`)
    REFERENCES `mtm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

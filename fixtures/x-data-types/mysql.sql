SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `x-data-types` ;
CREATE SCHEMA IF NOT EXISTS `x-data-types` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `x-data-types` ;

-- -----------------------------------------------------
-- Table `otm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm` ;

CREATE TABLE IF NOT EXISTS `otm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


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
  INDEX `fk_tbl_otm_idx` (`otm_id` ASC),
  CONSTRAINT `fk_tbl_otm`
    FOREIGN KEY (`otm_id`)
    REFERENCES `otm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
  INDEX `fk_mto_tbl1_idx` (`tbl_id` ASC),
  INDEX `fk_mto_otm1_idx` (`otm_id` ASC),
  CONSTRAINT `fk_mto_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto_otm1`
    FOREIGN KEY (`otm_id`)
    REFERENCES `otm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm` ;

CREATE TABLE IF NOT EXISTS `mtm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_has_mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm` (
  `tbl_id` VARCHAR(45) NOT NULL,
  `mtm_id` INT NOT NULL,
  PRIMARY KEY (`tbl_id`, `mtm_id`),
  INDEX `fk_tbl_has_mtm_mtm1_idx` (`mtm_id` ASC),
  INDEX `fk_tbl_has_mtm_tbl1_idx` (`tbl_id` ASC),
  CONSTRAINT `fk_tbl_has_mtm_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm_mtm1`
    FOREIGN KEY (`mtm_id`)
    REFERENCES `mtm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto_has_mtm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto_has_mtm` ;

CREATE TABLE IF NOT EXISTS `mto_has_mtm` (
  `mto_id` VARCHAR(45) NOT NULL,
  `mtm_id` INT NOT NULL,
  PRIMARY KEY (`mto_id`, `mtm_id`),
  INDEX `fk_mto_has_mtm_mtm1_idx` (`mtm_id` ASC),
  INDEX `fk_mto_has_mtm_mto1_idx` (`mto_id` ASC),
  CONSTRAINT `fk_mto_has_mtm_mto1`
    FOREIGN KEY (`mto_id`)
    REFERENCES `mto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto_has_mtm_mtm1`
    FOREIGN KEY (`mtm_id`)
    REFERENCES `mtm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `self_ref`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `self_ref` ;

CREATE TABLE IF NOT EXISTS `self_ref` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parent` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

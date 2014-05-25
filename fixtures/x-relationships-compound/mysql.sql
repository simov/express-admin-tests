SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `x-relationships-compound` ;
CREATE SCHEMA IF NOT EXISTS `x-relationships-compound` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `x-relationships-compound` ;

-- -----------------------------------------------------
-- Table `otm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm1` ;

CREATE TABLE IF NOT EXISTS `otm1` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id1`, `id2`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm2` ;

CREATE TABLE IF NOT EXISTS `otm2` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id1`, `id2`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm1` ;

CREATE TABLE IF NOT EXISTS `mtm1` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id1`, `id2`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm2` ;

CREATE TABLE IF NOT EXISTS `mtm2` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id1`, `id2`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl` ;

CREATE TABLE IF NOT EXISTS `tbl` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `otm1_id1` VARCHAR(45) NOT NULL,
  `otm1_id2` INT NOT NULL,
  `otm2_id1` VARCHAR(45) NOT NULL,
  `otm2_id2` INT NOT NULL,
  PRIMARY KEY (`id1`, `id2`),
  INDEX `fk_tbl_otm1_idx` (`otm1_id1` ASC, `otm1_id2` ASC),
  INDEX `fk_tbl_otm21_idx` (`otm2_id1` ASC, `otm2_id2` ASC),
  CONSTRAINT `fk_tbl_otm1`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1` ;

CREATE TABLE IF NOT EXISTS `mto1` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `tbl_id1` VARCHAR(45) NOT NULL,
  `tbl_id2` INT NOT NULL,
  `otm1_id1` VARCHAR(45) NOT NULL,
  `otm1_id2` INT NOT NULL,
  `otm2_id1` VARCHAR(45) NOT NULL,
  `otm2_id2` INT NOT NULL,
  PRIMARY KEY (`id1`, `id2`),
  INDEX `fk_mto1_tbl1_idx` (`tbl_id1` ASC, `tbl_id2` ASC),
  INDEX `fk_mto1_otm11_idx` (`otm1_id1` ASC, `otm1_id2` ASC),
  INDEX `fk_mto1_otm21_idx` (`otm2_id1` ASC, `otm2_id2` ASC),
  CONSTRAINT `fk_mto1_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_otm11`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2` ;

CREATE TABLE IF NOT EXISTS `mto2` (
  `id1` VARCHAR(45) NOT NULL,
  `id2` INT NOT NULL,
  `tbl_id1` VARCHAR(45) NOT NULL,
  `tbl_id2` INT NOT NULL,
  `otm1_id1` VARCHAR(45) NOT NULL,
  `otm1_id2` INT NOT NULL,
  `otm2_id1` VARCHAR(45) NOT NULL,
  `otm2_id2` INT NOT NULL,
  PRIMARY KEY (`id1`, `id2`),
  INDEX `fk_mto2_tbl1_idx` (`tbl_id1` ASC, `tbl_id2` ASC),
  INDEX `fk_mto2_otm11_idx` (`otm1_id1` ASC, `otm1_id2` ASC),
  INDEX `fk_mto2_otm21_idx` (`otm2_id1` ASC, `otm2_id2` ASC),
  CONSTRAINT `fk_mto2_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_otm11`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm1` (
  `tbl_id1` VARCHAR(45) NOT NULL,
  `tbl_id2` INT NOT NULL,
  `mtm1_id1` VARCHAR(45) NOT NULL,
  `mtm1_id2` INT NOT NULL,
  PRIMARY KEY (`tbl_id1`, `tbl_id2`, `mtm1_id1`, `mtm1_id2`),
  INDEX `fk_tbl_has_mtm1_mtm11_idx` (`mtm1_id1` ASC, `mtm1_id2` ASC),
  INDEX `fk_tbl_has_mtm1_tbl1_idx` (`tbl_id1` ASC, `tbl_id2` ASC),
  CONSTRAINT `fk_tbl_has_mtm1_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm2` (
  `tbl_id1` VARCHAR(45) NOT NULL,
  `tbl_id2` INT NOT NULL,
  `mtm2_id1` VARCHAR(45) NOT NULL,
  `mtm2_id2` INT NOT NULL,
  PRIMARY KEY (`tbl_id1`, `tbl_id2`, `mtm2_id1`, `mtm2_id2`),
  INDEX `fk_tbl_has_mtm2_mtm21_idx` (`mtm2_id1` ASC, `mtm2_id2` ASC),
  INDEX `fk_tbl_has_mtm2_tbl1_idx` (`tbl_id1` ASC, `tbl_id2` ASC),
  CONSTRAINT `fk_tbl_has_mtm2_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `mto1_has_mtm1` (
  `mto1_id1` VARCHAR(45) NOT NULL,
  `mto1_id2` INT NOT NULL,
  `mtm1_id1` VARCHAR(45) NOT NULL,
  `mtm1_id2` INT NOT NULL,
  PRIMARY KEY (`mto1_id1`, `mto1_id2`, `mtm1_id1`, `mtm1_id2`),
  INDEX `fk_mto1_has_mtm1_mtm11_idx` (`mtm1_id1` ASC, `mtm1_id2` ASC),
  INDEX `fk_mto1_has_mtm1_mto11_idx` (`mto1_id1` ASC, `mto1_id2` ASC),
  CONSTRAINT `fk_mto1_has_mtm1_mto11`
    FOREIGN KEY (`mto1_id1` , `mto1_id2`)
    REFERENCES `mto1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `mto1_has_mtm2` (
  `mto1_id1` VARCHAR(45) NOT NULL,
  `mto1_id2` INT NOT NULL,
  `mtm2_id1` VARCHAR(45) NOT NULL,
  `mtm2_id2` INT NOT NULL,
  PRIMARY KEY (`mto1_id1`, `mto1_id2`, `mtm2_id1`, `mtm2_id2`),
  INDEX `fk_mto1_has_mtm2_mtm21_idx` (`mtm2_id1` ASC, `mtm2_id2` ASC),
  INDEX `fk_mto1_has_mtm2_mto11_idx` (`mto1_id1` ASC, `mto1_id2` ASC),
  CONSTRAINT `fk_mto1_has_mtm2_mto11`
    FOREIGN KEY (`mto1_id1` , `mto1_id2`)
    REFERENCES `mto1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `mto2_has_mtm1` (
  `mto2_id1` VARCHAR(45) NOT NULL,
  `mto2_id2` INT NOT NULL,
  `mtm1_id1` VARCHAR(45) NOT NULL,
  `mtm1_id2` INT NOT NULL,
  PRIMARY KEY (`mto2_id1`, `mto2_id2`, `mtm1_id1`, `mtm1_id2`),
  INDEX `fk_mto2_has_mtm1_mtm11_idx` (`mtm1_id1` ASC, `mtm1_id2` ASC),
  INDEX `fk_mto2_has_mtm1_mto21_idx` (`mto2_id1` ASC, `mto2_id2` ASC),
  CONSTRAINT `fk_mto2_has_mtm1_mto21`
    FOREIGN KEY (`mto2_id1` , `mto2_id2`)
    REFERENCES `mto2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `mto2_has_mtm2` (
  `mto2_id1` VARCHAR(45) NOT NULL,
  `mto2_id2` INT NOT NULL,
  `mtm2_id1` VARCHAR(45) NOT NULL,
  `mtm2_id2` INT NOT NULL,
  PRIMARY KEY (`mto2_id1`, `mto2_id2`, `mtm2_id1`, `mtm2_id2`),
  INDEX `fk_mto2_has_mtm2_mtm21_idx` (`mtm2_id1` ASC, `mtm2_id2` ASC),
  INDEX `fk_mto2_has_mtm2_mto21_idx` (`mto2_id1` ASC, `mto2_id2` ASC),
  CONSTRAINT `fk_mto2_has_mtm2_mto21`
    FOREIGN KEY (`mto2_id1` , `mto2_id2`)
    REFERENCES `mto2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

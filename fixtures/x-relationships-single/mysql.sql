SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `otm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm1` ;

CREATE TABLE IF NOT EXISTS `otm1` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `otm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `otm2` ;

CREATE TABLE IF NOT EXISTS `otm2` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl` ;

CREATE TABLE IF NOT EXISTS `tbl` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_otm1_idx` (`otm1_id` ASC),
  INDEX `fk_tbl_otm21_idx` (`otm2_id` ASC),
  CONSTRAINT `fk_tbl_otm1`
    FOREIGN KEY (`otm1_id`)
    REFERENCES `otm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_otm21`
    FOREIGN KEY (`otm2_id`)
    REFERENCES `otm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm1` ;

CREATE TABLE IF NOT EXISTS `mtm1` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mtm2` ;

CREATE TABLE IF NOT EXISTS `mtm2` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1` ;

CREATE TABLE IF NOT EXISTS `mto1` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_id` INT NOT NULL,
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mto1_tbl1_idx` (`tbl_id` ASC),
  INDEX `fk_mto1_otm11_idx` (`otm1_id` ASC),
  INDEX `fk_mto1_otm21_idx` (`otm2_id` ASC),
  CONSTRAINT `fk_mto1_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_otm11`
    FOREIGN KEY (`otm1_id`)
    REFERENCES `otm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_otm21`
    FOREIGN KEY (`otm2_id`)
    REFERENCES `otm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2` ;

CREATE TABLE IF NOT EXISTS `mto2` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_id` INT NOT NULL,
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mto2_tbl1_idx` (`tbl_id` ASC),
  INDEX `fk_mto2_otm11_idx` (`otm1_id` ASC),
  INDEX `fk_mto2_otm21_idx` (`otm2_id` ASC),
  CONSTRAINT `fk_mto2_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_otm11`
    FOREIGN KEY (`otm1_id`)
    REFERENCES `otm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_otm21`
    FOREIGN KEY (`otm2_id`)
    REFERENCES `otm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm1` (
  `tbl_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  PRIMARY KEY (`tbl_id`, `mtm1_id`),
  INDEX `fk_tbl_has_mtm1_mtm11_idx` (`mtm1_id` ASC),
  INDEX `fk_tbl_has_mtm1_tbl1_idx` (`tbl_id` ASC),
  CONSTRAINT `fk_tbl_has_mtm1_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbl_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `tbl_has_mtm2` (
  `tbl_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  PRIMARY KEY (`tbl_id`, `mtm2_id`),
  INDEX `fk_tbl_has_mtm2_mtm21_idx` (`mtm2_id` ASC),
  INDEX `fk_tbl_has_mtm2_tbl1_idx` (`tbl_id` ASC),
  CONSTRAINT `fk_tbl_has_mtm2_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `mto1_has_mtm1` (
  `mto1_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  PRIMARY KEY (`mto1_id`, `mtm1_id`),
  INDEX `fk_mto1_has_mtm1_mtm11_idx` (`mtm1_id` ASC),
  INDEX `fk_mto1_has_mtm1_mto11_idx` (`mto1_id` ASC),
  CONSTRAINT `fk_mto1_has_mtm1_mto11`
    FOREIGN KEY (`mto1_id`)
    REFERENCES `mto1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto1_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto1_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `mto1_has_mtm2` (
  `mto1_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  PRIMARY KEY (`mto1_id`, `mtm2_id`),
  INDEX `fk_mto1_has_mtm2_mtm21_idx` (`mtm2_id` ASC),
  INDEX `fk_mto1_has_mtm2_mto11_idx` (`mto1_id` ASC),
  CONSTRAINT `fk_mto1_has_mtm2_mto11`
    FOREIGN KEY (`mto1_id`)
    REFERENCES `mto1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2_has_mtm1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2_has_mtm1` ;

CREATE TABLE IF NOT EXISTS `mto2_has_mtm1` (
  `mto2_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  PRIMARY KEY (`mto2_id`, `mtm1_id`),
  INDEX `fk_mto2_has_mtm1_mtm11_idx` (`mtm1_id` ASC),
  INDEX `fk_mto2_has_mtm1_mto21_idx` (`mto2_id` ASC),
  CONSTRAINT `fk_mto2_has_mtm1_mto21`
    FOREIGN KEY (`mto2_id`)
    REFERENCES `mto2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mto2_has_mtm2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mto2_has_mtm2` ;

CREATE TABLE IF NOT EXISTS `mto2_has_mtm2` (
  `mto2_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  PRIMARY KEY (`mto2_id`, `mtm2_id`),
  INDEX `fk_mto2_has_mtm2_mtm21_idx` (`mtm2_id` ASC),
  INDEX `fk_mto2_has_mtm2_mto21_idx` (`mto2_id` ASC),
  CONSTRAINT `fk_mto2_has_mtm2_mto21`
    FOREIGN KEY (`mto2_id`)
    REFERENCES `mto2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

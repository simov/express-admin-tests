
-- -----------------------------------------------------
-- Table `otm1`
-- -----------------------------------------------------

CREATE TABLE `otm1` (
  `name1` VARCHAR(45) NOT NULL);


-- -----------------------------------------------------
-- Table `otm2`
-- -----------------------------------------------------

CREATE TABLE `otm2` (
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL);


-- -----------------------------------------------------
-- Table `tbl`
-- -----------------------------------------------------

CREATE TABLE `tbl` (
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
  CONSTRAINT `fk_tbl_otm1`
    FOREIGN KEY (`otm1_id`)
    REFERENCES `otm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_otm21`
    FOREIGN KEY (`otm2_id`)
    REFERENCES `otm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mtm1`
-- -----------------------------------------------------

CREATE TABLE `mtm1` (
  `name1` VARCHAR(45) NOT NULL);


-- -----------------------------------------------------
-- Table `mtm2`
-- -----------------------------------------------------

CREATE TABLE `mtm2` (
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL);


-- -----------------------------------------------------
-- Table `mto1`
-- -----------------------------------------------------

CREATE TABLE `mto1` (
  `tbl_id` INT NOT NULL,
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
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
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2`
-- -----------------------------------------------------

CREATE TABLE `mto2` (
  `tbl_id` INT NOT NULL,
  `otm1_id` INT NOT NULL,
  `otm2_id` INT NOT NULL,
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
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `tbl_has_mtm1`
-- -----------------------------------------------------

CREATE TABLE `tbl_has_mtm1` (
  `tbl_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  CONSTRAINT `fk_tbl_has_mtm1_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `tbl_has_mtm2`
-- -----------------------------------------------------

CREATE TABLE `tbl_has_mtm2` (
  `tbl_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  CONSTRAINT `fk_tbl_has_mtm2_tbl1`
    FOREIGN KEY (`tbl_id`)
    REFERENCES `tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto1_has_mtm1`
-- -----------------------------------------------------

CREATE TABLE `mto1_has_mtm1` (
  `mto1_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  CONSTRAINT `fk_mto1_has_mtm1_mto11`
    FOREIGN KEY (`mto1_id`)
    REFERENCES `mto1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto1_has_mtm2`
-- -----------------------------------------------------

CREATE TABLE `mto1_has_mtm2` (
  `mto1_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  CONSTRAINT `fk_mto1_has_mtm2_mto11`
    FOREIGN KEY (`mto1_id`)
    REFERENCES `mto1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2_has_mtm1`
-- -----------------------------------------------------

CREATE TABLE `mto2_has_mtm1` (
  `mto2_id` INT NOT NULL,
  `mtm1_id` INT NOT NULL,
  CONSTRAINT `fk_mto2_has_mtm1_mto21`
    FOREIGN KEY (`mto2_id`)
    REFERENCES `mto2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id`)
    REFERENCES `mtm1` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2_has_mtm2`
-- -----------------------------------------------------

CREATE TABLE `mto2_has_mtm2` (
  `mto2_id` INT NOT NULL,
  `mtm2_id` INT NOT NULL,
  CONSTRAINT `fk_mto2_has_mtm2_mto21`
    FOREIGN KEY (`mto2_id`)
    REFERENCES `mto2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id`)
    REFERENCES `mtm2` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

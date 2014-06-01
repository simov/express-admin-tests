
-- -----------------------------------------------------
-- Table `otm1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `otm1` (
  `id2` VARCHAR(45) NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id2`));


-- -----------------------------------------------------
-- Table `otm2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `otm2` (
  `id2` VARCHAR(45) NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id2`));


-- -----------------------------------------------------
-- Table `mtm1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mtm1` (
  `id2` VARCHAR(45) NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id2`));


-- -----------------------------------------------------
-- Table `mtm2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mtm2` (
  `id2` VARCHAR(45) NOT NULL,
  `name1` VARCHAR(45) NOT NULL,
  `name2` INT NOT NULL,
  PRIMARY KEY (`id2`));


-- -----------------------------------------------------
-- Table `tbl`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl` (
  `id2` VARCHAR(45) NOT NULL,
  `otm1_id1` INT NOT NULL,
  `otm1_id2` VARCHAR(45) NOT NULL,
  `otm2_id1` INT NOT NULL,
  `otm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id2`),

  CONSTRAINT `fk_tbl_otm1`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto1` (
  `id2` VARCHAR(45) NOT NULL,
  `tbl_id1` INT NOT NULL,
  `tbl_id2` VARCHAR(45) NOT NULL,
  `otm1_id1` INT NOT NULL,
  `otm1_id2` VARCHAR(45) NOT NULL,
  `otm2_id1` INT NOT NULL,
  `otm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id2`),

  CONSTRAINT `fk_mto1_otm11`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tbl_id1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto2` (
  `id2` VARCHAR(45) NOT NULL,
  `tbl_id1` INT NOT NULL,
  `tbl_id2` VARCHAR(45) NOT NULL,
  `otm1_id1` INT NOT NULL,
  `otm1_id2` VARCHAR(45) NOT NULL,
  `otm2_id1` INT NOT NULL,
  `otm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id2`),

  CONSTRAINT `fk_mto2_otm11`
    FOREIGN KEY (`otm1_id1` , `otm1_id2`)
    REFERENCES `otm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_otm21`
    FOREIGN KEY (`otm2_id1` , `otm2_id2`)
    REFERENCES `otm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tbl_id1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `tbl_has_mtm1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_has_mtm1` (
  `tbl_id1` INT NOT NULL,
  `tbl_id2` VARCHAR(45) NOT NULL,
  `mtm1_id1` INT NOT NULL,
  `mtm1_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tbl_id1`, `tbl_id2`, `mtm1_id1`, `mtm1_id2`),

  CONSTRAINT `fk_tbl_has_mtm1_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `tbl_has_mtm2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `tbl_has_mtm2` (
  `tbl_id1` INT NOT NULL,
  `tbl_id2` VARCHAR(45) NOT NULL,
  `mtm2_id1` INT NOT NULL,
  `mtm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tbl_id1`, `tbl_id2`, `mtm2_id1`, `mtm2_id2`),

  CONSTRAINT `fk_tbl_has_mtm2_tbl1`
    FOREIGN KEY (`tbl_id1` , `tbl_id2`)
    REFERENCES `tbl` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto1_has_mtm1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto1_has_mtm1` (
  `mto1_id1` INT NOT NULL,
  `mto1_id2` VARCHAR(45) NOT NULL,
  `mtm1_id1` INT NOT NULL,
  `mtm1_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mto1_id1`, `mto1_id2`, `mtm1_id1`, `mtm1_id2`),

  CONSTRAINT `fk_mto1_has_mtm1_mto11`
    FOREIGN KEY (`mto1_id1` , `mto1_id2`)
    REFERENCES `mto1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto1_has_mtm2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto1_has_mtm2` (
  `mto1_id1` INT NOT NULL,
  `mto1_id2` VARCHAR(45) NOT NULL,
  `mtm2_id1` INT NOT NULL,
  `mtm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mto1_id1`, `mto1_id2`, `mtm2_id1`, `mtm2_id2`),

  CONSTRAINT `fk_mto1_has_mtm2_mto11`
    FOREIGN KEY (`mto1_id1` , `mto1_id2`)
    REFERENCES `mto1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto1_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2_has_otm1`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto2_has_mtm1` (
  `mto2_id1` INT NOT NULL,
  `mto2_id2` VARCHAR(45) NOT NULL,
  `mtm1_id1` INT NOT NULL,
  `mtm1_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mto2_id1`, `mto2_id2`, `mtm1_id1`, `mtm1_id2`),

  CONSTRAINT `fk_mto2_has_mtm1_mto21`
    FOREIGN KEY (`mto2_id1` , `mto2_id2`)
    REFERENCES `mto2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm1_mtm11`
    FOREIGN KEY (`mtm1_id1` , `mtm1_id2`)
    REFERENCES `mtm1` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mto2_has_otm2`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `mto2_has_mtm2` (
  `mto2_id1` INT NOT NULL,
  `mto2_id2` VARCHAR(45) NOT NULL,
  `mtm2_id1` INT NOT NULL,
  `mtm2_id2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mto2_id1`, `mto2_id2`, `mtm2_id1`, `mtm2_id2`),

  CONSTRAINT `fk_mto2_has_mtm2_mto21`
    FOREIGN KEY (`mto2_id1` , `mto2_id2`)
    REFERENCES `mto2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mto2_has_mtm2_mtm21`
    FOREIGN KEY (`mtm2_id1` , `mtm2_id2`)
    REFERENCES `mtm2` (`id1` , `id2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

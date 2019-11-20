-- -----------------------------------------------------
-- Schema Informacion_XP
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Informacion_XP` ;

-- -----------------------------------------------------
-- Schema Informacion_XP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Informacion_XP` ;
USE `Informacion_XP` ;

-- -----------------------------------------------------
-- Table `Informacion_XP`.`perfil`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Informacion_XP`.`perfil` ;

CREATE TABLE IF NOT EXISTS `Informacion_XP`.`perfil` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `nombre_UNIQUE` ON `Informacion_XP`.`perfil` (`nombre` ASC) VISIBLE;

INSERT INTO `Informacion_XP`.`perfil` (`nombre`)
VALUES ('Administrador'), ('Jefe'), ('Asesor');


-- -----------------------------------------------------
-- Table `Informacion_XP`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Informacion_XP`.`usuario` ;

CREATE TABLE IF NOT EXISTS `Informacion_XP`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(50) NOT NULL,
  `p_apellido` VARCHAR(50) NOT NULL,
  `s_apellido` VARCHAR(50) NULL,
  `alias` VARCHAR(20) NOT NULL,
  `pass` VARCHAR(100) NOT NULL,
  `id_perfil` INT NOT NULL,
  `fecha_registro` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `id_perfil_fk`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `Informacion_XP`.`perfil` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `alias_UNIQUE` ON `Informacion_XP`.`usuario` (`alias` ASC) VISIBLE;

CREATE INDEX `id_perfil_fk_idx` ON `Informacion_XP`.`usuario` (`id_perfil` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Informacion_XP`.`asesor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Informacion_XP`.`asesor` ;

CREATE TABLE IF NOT EXISTS `Informacion_XP`.`asesor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_jefe_asesor` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_usuario_fk`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Informacion_XP`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_jefe_asesor_fk`
    FOREIGN KEY (`id_jefe_asesor`)
    REFERENCES `Informacion_XP`.`asesor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `usuario_UNIQUE` ON `Informacion_XP`.`asesor` (`id_usuario` ASC) VISIBLE;

CREATE INDEX `id_jefe_asesor_fk_idx` ON `Informacion_XP`.`asesor` (`id_jefe_asesor` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Informacion_XP`.`log_sesiones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Informacion_XP`.`log_sesiones` ;

CREATE TABLE IF NOT EXISTS `Informacion_XP`.`log_sesiones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `accion` VARCHAR(20) NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT NOW(),
  `localizacion` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_usuario_lg_fk`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Informacion_XP`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `id_usuario_fk_idx` ON `Informacion_XP`.`log_sesiones` (`id_usuario` ASC) VISIBLE;

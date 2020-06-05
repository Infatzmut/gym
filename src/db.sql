-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gimnasio
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gimnasio` ;

-- -----------------------------------------------------
-- Schema gimnasio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gimnasio` DEFAULT CHARACTER SET utf8 ;
USE `gimnasio` ;



-- -----------------------------------------------------
-- Table `gimnasio`.`sedes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`sedes` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`sedes` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `direccion` VARCHAR(50) NULL,
  `estadosid` TINYINT(3) NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`tipo_documento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`tipo_documento` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`tipo_documento` (
  `id` TINYINT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`entrenadores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`entrenadores` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`entrenadores` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  `apellidoP` VARCHAR(25) NOT NULL,
  `apellidoM` VARCHAR(25) NULL,
  `tipoDocumentoId` TINYINT(2) UNSIGNED NOT NULL,
  `documentoId` VARCHAR(12) NULL,
  `email` VARCHAR(50) NULL,
  `direccion` VARCHAR(45) NULL,
  `idSede` MEDIUMINT UNSIGNED NOT NULL,
  `idEstado` TINYINT(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `documentId_UNIQUE` (`documentoId` ASC) VISIBLE,
  INDEX `FK_Sedes2_idx` (`idSede` ASC) VISIBLE,
  INDEX `FK_TipoDoc2_idx` (`tipoDocumentoId` ASC) VISIBLE,
  CONSTRAINT `FK_Sedes2`
    FOREIGN KEY (`idSede`)
    REFERENCES `gimnasio`.`sedes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_TipoDoc2`
    FOREIGN KEY (`tipoDocumentoId`)
    REFERENCES `gimnasio`.`tipo_documento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`tipo_membresia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`tipo_membresia` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`tipo_membresia` (
  `id` TINYINT(3) NOT NULL,
  `descripcion` VARCHAR(30) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`clientes` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`clientes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `apellidoP` VARCHAR(30) NOT NULL,
  `apellidoM` VARCHAR(30) NULL,
  `fecha_nac` DATE NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `tipoDocumento` TINYINT(2) UNSIGNED NOT NULL,
  `documentoId` VARCHAR(12) NOT NULL,
  `direccion` VARCHAR(50) NULL,
  `tipoMembresiaId` TINYINT(2) NOT NULL,
  `idSede` MEDIUMINT UNSIGNED NULL,
  `estadoId` TINYINT(3) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `documentoId_UNIQUE` (`documentoId` ASC) VISIBLE,
  INDEX `FK_Membresia_idx` (`tipoMembresiaId` ASC) VISIBLE,
  INDEX `FK_Sedes1_idx` (`idSede` ASC) VISIBLE,
  INDEX `FK_TipoDoc1_idx` (`tipoDocumento` ASC) VISIBLE,
  CONSTRAINT `FK_Membresia1`
    FOREIGN KEY (`tipoMembresiaId`)
    REFERENCES `gimnasio`.`tipo_membresia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Sedes1`
    FOREIGN KEY (`idSede`)
    REFERENCES `gimnasio`.`sedes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_TipoDoc1`
    FOREIGN KEY (`tipoDocumento`)
    REFERENCES `gimnasio`.`tipo_documento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`registro_asistencia_cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`registro_asistencia_cliente` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`registro_asistencia_cliente` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `registro1` TIME NULL,
  `registro2` TIME NULL,
  `idCliente` BIGINT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Clientes1_idx` (`idCliente` ASC) VISIBLE,
  CONSTRAINT `FK_Clientes1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `gimnasio`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`tipo_entrenamiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`tipo_entrenamiento` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`tipo_entrenamiento` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NULL,
  `descripcion` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`horarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`horarios` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`horarios` (
  `id` MEDIUMINT NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`salones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`salones` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`salones` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `sedeId` MEDIUMINT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Sedes4_idx` (`sedeId` ASC) VISIBLE,
  CONSTRAINT `FK_Sedes4`
    FOREIGN KEY (`sedeId`)
    REFERENCES `gimnasio`.`sedes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gimnasio`.`horarios_entrenamiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gimnasio`.`horarios_entrenamiento` ;

CREATE TABLE IF NOT EXISTS `gimnasio`.`horarios_entrenamiento` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `idHorario` MEDIUMINT NOT NULL,
  `idEntrenamiento` MEDIUMINT NOT NULL,
  `idSalon` MEDIUMINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Salon1_idx` (`idSalon` ASC) VISIBLE,
  INDEX `FK_TipoEnt_idx` (`idEntrenamiento` ASC) VISIBLE,
  INDEX `Fk_Horario1_idx` (`idHorario` ASC) VISIBLE,
  CONSTRAINT `FK_Salon1`
    FOREIGN KEY (`idSalon`)
    REFERENCES `gimnasio`.`salones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_TipoEnt1`
    FOREIGN KEY (`idEntrenamiento`)
    REFERENCES `gimnasio`.`tipo_entrenamiento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Fk_Horario1`
    FOREIGN KEY (`idHorario`)
    REFERENCES `gimnasio`.`horarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

use gimnasio;
--modifications 'cause had some mistakes on columns AI attribute;
alter table horarios_entrenamiento modify id MEDIUMINT auto_increment;
alter table tipo_entrenamiento modify descripcion varchar(255) not null; 

-- Insert data
insert into sedes(direccion, estadosid) values ('Av Peru 2020', 1);
insert into tipo_documento(descripcion) values ('DNI'),('CARNET EXTRANJERIA'), ('PASAPORTE');
insert into horarios(id, hora_inicio, hora_fin) values (1,'06:00','07:00'), (2,'07:00','08:00'), (3,'08:00','09:00'), (4,'09:00','10:00');
insert into horarios(id, hora_inicio, hora_fin) values (5,'18:00','19:00'), (6,'19:00','20:00'), (7,'20:00','21:00'), (8,'21:00','22:00');
insert into salones(nombre, sedeId) values ('salon 1','1'), ('salon 2','1');
insert into tipo_entrenamiento(nombre, descripcion) values ('funcional','Entrenamiento de alta exigencia que combina el peso corporal y pesas'), 
															('fullbody', 'Baile realizado con un cierto grado de exigencia escencial para quemar grasa'),
                                                            ('MMA', 'Arte marcial que todas las partes del cuerpo son tus instrumentos');
                                                                                                                       
insert into horarios_entrenamiento(idHorario, idEntrenamiento, idSalon) values(1, 3, 2), (5, 3, 2), (2, 1, 1), (5, 2, 1), (8, 2, 1);                                                            
insert into tipo_membresia(id, descripcion) values (1, 'VIP'), (2, 'ESTANDAR');
-- MySQL Script generated by MySQL Workbench
-- Mon Sep 19 21:02:20 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Auto garage
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Auto garage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Auto garage` DEFAULT CHARACTER SET utf8 ;
USE `Auto garage` ;

-- -----------------------------------------------------
-- Table `Auto garage`.`Cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Auto garage`.`Cars` (
  `idCars` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(20) NOT NULL,
  `model` VARCHAR(20) NOT NULL,
  `yearOfIssue` INT NOT NULL,
  `mileage` DECIMAL(10,2) NOT NULL,
  `stateNumber` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`idCars`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Auto garage`.`Drivers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Auto garage`.`Drivers` (
  `idDrivers` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(90) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `address` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `callCode` VARCHAR(30) NOT NULL,
  `dateOfBirth` DATE NOT NULL,
  `experience` INT NOT NULL,
  PRIMARY KEY (`idDrivers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Auto garage`.`Traffics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Auto garage`.`Traffics` (
  `idTraffics` INT NOT NULL AUTO_INCREMENT,
  `startPoint` VARCHAR(120) NOT NULL,
  `endPoint` VARCHAR(120) NOT NULL,
  `trafficLength` INT NOT NULL,
  `countStops` INT NOT NULL,
  `idCars` INT NOT NULL,
  `idDrivers` INT NOT NULL,
  PRIMARY KEY (`idTraffics`),
  INDEX `cars_idx` (`idCars` ASC) VISIBLE,
  INDEX `drivers_idx` (`idDrivers` ASC) VISIBLE,
  CONSTRAINT `cars`
    FOREIGN KEY (`idCars`)
    REFERENCES `Auto garage`.`Cars` (`idCars`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `drivers`
    FOREIGN KEY (`idDrivers`)
    REFERENCES `Auto garage`.`Drivers` (`idDrivers`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


INSERT INTO cars(idCars, brand, model, yearOfIssue, mileage, stateNumber)
VALUES 
	(1, 'HYINDAI', 'XCIENT', 2014, 322067, '2105-AM 5'),
    (2, 'KAMAZ', '54901', 2017, 132503, '2203-ЛС 7'),
    (3, 'MAZ', '5440M9', 2015, 188945, '1205-ЛЧ 7'),
    (4, 'VOLVO', 'FE 2', 2019, 95671, '2218-КХ 4'),
    (5, 'SCANIA', 'S730 V8', 2020, 66743, '6262-АС 7');

INSERT INTO drivers(idDrivers, fullName, category, address, phone, callCode, dateOfBirth, experience)
VALUES
	(1, 'Рогалевич Виктор Семенович', 'Крупногабаритный груз', 'г.Минск ул.Волоха 3-17', '447104585', '+375', '1975-12-01', 24),
    (2, 'Ефремов Геннадий Викторович', 'Крупногабаритный груз', 'г.Минск ул.Маяковского 23-102', '445629451', '+375', '1991-05-22', 8),
    (3, 'Чернов Юрий Павлович', 'Древесина', 'г.Минск ул.Дзержинского 88-137', '331144185', '+375', '1971-03-12', 27),
    (4, 'Керножицкий Степан Дмитриевич', 'Техника', 'г.Минск ул.Слуцкое шоссе 61-67', '294104582', '+375', '1968-01-22', 26),
    (5, 'Соколовский Валерий Александрович', 'Стекло', 'г.Минск ул.Карпова 39-14', '295012127', '+375', '1988-10-13', 9);


INSERT INTO traffics(idTraffics, startPoint, endPoint, trafficLength, countStops, idCars, idDrivers)
VALUES (1, 'Минск', 'Варшава', 557, 3, 1, 2),
    (2, 'Брест', 'Москва', 1062, 5, 2, 3),
    (3, 'Могилев', 'Берлин', 1313, 7, 3, 4),
    (4, 'Минск', 'Прага', 1297, 7, 4, 5),
    (5, 'Солигорск', 'Киев', 469, 2, 5, 1);

    


SELECT * FROM cars;
SELECT * FROM drivers;
SELECT * FROM traffics;




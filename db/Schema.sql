DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burger (
id INT NOT NULL AUTO_INCREMENT,
burgerName VARCHAR(255) NOT NULL,
devoured BOOLEAN DEFAULT false,
PRIMARY KEY(id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
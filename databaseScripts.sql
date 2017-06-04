CREATE DATABASE  garagefellows;



CREATE TABLE users (
	userId SERIAL,
  userFirstName VARCHAR(50),
  userLastName VARCHAR(50),
  email VARCHAR(254),
  zipCode INTEGER,
  PRIMARY KEY (userID)
);



CREATE TABLE vehicles (
  vehicleId SERIAL,
	year INTEGER NOT NULL,
	make VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	vclass VARCHAR(50),
	drive VARCHAR(50),
	cylinders INTEGER,
	displ INTEGER,
	trany VARCHAR(50) NOT NULL,
  PRIMARY KEY (vehicleId)
);



CREATE TABLE inventory (
	inventoryId SERIAL,
  userId INTEGER REFERENCES users (userId),
  vehicleId INTEGER REFERENCES vehicles (vehicleId),
  partName VARCHAR(50),
  description VARCHAR(1000),
  price MONEY,
  PRIMARY KEY (inventoryId)
);



INSERT INTO users (userFirstName, userLastName, email, zipCode)
VALUES
	('Christy', 'La Guardia', 'christinelaguardia@gmail.com', 97205),
  ('Erdem', 'Koral', 'koral.erdem@gmail.com', 97123),
  ('Andrew', 'Bodey', 'abodey@gmail.com', 90210);



--INSERT INTO vehicles (vehicleYear, vehicleMake, vehicleModel)
--VALUES (1992, 'Chevrolet', 'Suburban');



INSERT INTO inventory (userId, vehicleId, partName, description, price)
VALUES
	(1, 1, 'Alternator', 'New Alternator, bought the thign thten stoafewiogwlkagle', 70),
  (2, 1, 'Alternator', 'Used Alternator, bought the thign thten stoafewiogwlkagle', 40.99),
  (2, 1, 'Alternator', 'Used Alternator, bought the thign thten stoafewiogwlkagle', 40.95),
  (3, 1, 'Alternator', 'Newer Alternator, bought the thign thten stoafewiogwlkagle', 100),
  (3, 1, 'Alternator', 'Newer Alternator, bought the thign thten stoafewiogwlkagle', 105.75);

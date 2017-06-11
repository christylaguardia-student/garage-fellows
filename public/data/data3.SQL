
DROP TABLE IF EXISTS parts;

CREATE TABLE parts (partname VARCHAR(50), imagesource VARCHAR(255));

INSERT INTO parts (partname, imagesource)
VALUES ('Tires', 'tire.png'),
        ('Alternator', 'generator.png'),
        ('Water Pump', 'vintage-water-pump.png'),
        ('Camshaft', 'engine.png'),
        ('Intake Manifold', 'suspension.png'),
        ('Spark Plugs', 'spark-plug.png'),
        ('Exhaust', 'exhaust-pipe.png'),
        ('Headlight', 'headlight.png'),
        ('Belts', 'car.png'),
        ('Brake Pads', 'disc-brake.png');


DELETE FROM inventory;

INSERT INTO inventory (userId, vehicleId, partName, description, price, datecreated)
(SELECT (FLOOR(RANDOM()*(3-1+1))+1)
        , vehicleid
        , partname
        , 'Used'
        , (RANDOM()*(200-5)+5)::numeric::money
        , '2017-06-08'
FROM vehicles, parts);

ALTER TABLE inventory
ADD COLUMN imagesource VARCHAR(255);

UPDATE inventory
SET imagesource = parts.imagesource
FROM parts
WHERE parts.partname = inventory.partname;


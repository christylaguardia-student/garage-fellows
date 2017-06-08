CREATE TABLE parts (partname VARCHAR(50));

INSERT INTO parts (partname) VALUES ('Tires'),('Alternator'),('Water Pump'),('Camshaft'),('Intake Manifold'),('Spark Plugs'),('Exhaust'),('Headlight'),('Belts'),('Brake Pads');

-- THIS WILL INSERT 379020 ROWS
INSERT INTO inventory (userId, vehicleId, partName, description, price, datecreated)
(SELECT (FLOOR(RANDOM()*(3-1+1))+1)
        , vehicleid
        , partname
        , 'Used'
        , (RANDOM()*(200-5)+5)::numeric::money
        , '2017-06-08'
FROM vehicles, parts);

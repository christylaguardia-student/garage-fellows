'use strict';

const pg = require('pg');
// const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.pgURL;
const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) {
  console.log(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/inventory', (request, response) => {
  console.log('getting data from db');
  client.query(`
    SELECT inventoryid,
      year,
      make,
      model,
      partname,
      description,
      price,
      email,
      zipcode,
      datecreated
    FROM inventory
    INNER JOIN vehicles ON vehicles.vehicleId = inventory.vehicleId
    INNER JOIN users ON users.userId = inventory.userId
    ORDER BY datecreated DESC`)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/years', (request, response) => {
  client.query(`
    SELECT DISTINCT year
    FROM vehicles ORDER BY year DESC
    `)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/makes', (request, response) => {
  client.query(`
    SELECT DISTINCT make
    FROM vehicles
    WHERE year= 1992
    `)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/models', (request, response) => {
  client.query(`
    SELECT DISTINCT model
    FROM vehicles
    WHERE year= 1992 AND make= 'Chevrolet'
    `)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.post('/new', (request, response) => {
  client.query(`
    INSERT INTO users (email, zipcode)
    VALUES ($1, $2) ON CONFLICT DO NOTHING
    `,
  [
    request.body.email, request.body.zipcode
  ])
  // .then(() => {
  //   client.query(`
  //     INSERT INTO inventory (vehicleid, userid, partname, description, price)
  //     SELECT vehicleid, userid, $1, $2, $3
  //     FROM users
  //     WHERE userid = $4
  //     `,
  //     [
  //       request.body.partname,
  //       request.body.description,
  //       request.body.price,
  //       request.body.userid
  //     ]
  //   )
  // })
  .then(() => response.send('Insert complete'))
  .catch(console.error);
});

// TODO: delete items

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

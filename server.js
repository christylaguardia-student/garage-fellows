'use strict';

const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) { console.log(error); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', function(request, response) {
  response.sendFile('index.html', {root: '.'});
});

app.get('/inventory', (request, response) => {
  console.log('getting data from database');

  // check if integer is passed into query string
  var page = parseInt(request.query.page, 10);
  if (isNaN(page) || page < 1) { page = 1; }

  // check if limit is too big so not to crash the server
  var limit = parseInt(request.query.limit, 10);
  if (isNaN(limit)) { limit = 10; }
  else if (limit > 50 ) { limit = 50; }
  else if (limit < 1 ) { limit = 1; }

  // calculate the OFFSET
  var offset = (page - 1) * limit;

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
    ORDER BY inventoryid
    OFFSET $1 LIMIT $2
    `,[
      offset,
      limit
    ]
    // QUESTION: not sure if we need this
    // ,function(err, result) {
    //   var count = parseInt(result.row[0].count, 10);
    // }
  )
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/search-inventory', (request, response) => {
  console.log('getting data from database');
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
    WHERE vehicles.year=$1 AND vehicles.make=$2 AND vehicles.model=$3
    ORDER BY datecreated DESC
    `,[
      request.query.year,
      request.query.make,
      request.query.model
    ])
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/vehicle_years', (request, response) => {
  client.query(`
    SELECT DISTINCT year
    FROM vehicles ORDER BY year DESC
    `)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/vehicle_makes', (request, response) => {
  client.query(`
    SELECT DISTINCT make
    FROM vehicles
    WHERE year= $1
    `,[
      request.query.year
    ])
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/vehicle_models', (request, response) => {
  client.query(`
    SELECT DISTINCT model
    FROM vehicles
    WHERE year= $1 AND make= $2
    `,[
      request.query.year,
      request.query.make
    ])
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/iyears', (request, response) => {
  client.query(`
    SELECT DISTINCT v.year
    FROM inventory i
    JOIN vehicles v ON v.vehicleid = i.vehicleid
    ORDER BY v.year DESC
    `)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/imakes', (request, response) => {
  client.query(`
    SELECT DISTINCT v.make
    FROM inventory i
    JOIN vehicles v ON v.vehicleid = i.vehicleid
    WHERE v.year= $1
    `,[
      request.query.year
    ])
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/imodels', (request, response) => {
  client.query(`
    SELECT DISTINCT v.model
    FROM inventory i
    JOIN vehicles v ON v.vehicleid = i.vehicleid
    WHERE v.year= $1 AND v.make= $2
    `,[
      request.query.year,
      request.query.make
    ])
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.post('/new', (request, response) => {
  client.query(`
    INSERT INTO users (userfirstname, userlastname, email, zipcode)
    VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING
    `,
    [
      request.body.userfirstname,
      request.body.userlastname,
      request.body.email,
      request.body.zipcode
    ]
  )
  .then(() => {
    client.query(`
      INSERT INTO inventory (userid, vehicleid, partname, description, price, datecreated)
      VALUES (
        (SELECT userid FROM users WHERE email=$1 LIMIT 1),
        (SELECT vehicleid FROM vehicles WHERE year=$2 AND make=$3 AND model=$4 LIMIT 1),
        $5, $6, $7, $8)
      `,
      [
        request.body.email,
        request.body.year,
        request.body.make,
        request.body.model,
        request.body.partname,
        request.body.description,
        request.body.price,
        request.body.datecreated
      ]
    )
  })
  .then(() => response.send('Your part has been posted!'))
  .catch(console.error);
});

// TODO: delete items

app.delete('/inventory/delete:id', (request, response) => {
  client.query(
    `DELETE FROM inventory WHERE inventoryId=$1;`,
    [request.params.id]
  )
  .then(() => response.send('Delete complete'))
  .catch(console.error);
});

app.delete('/inventory/delete', (request, response) => {
  client.query('DELETE FROM inventory')
  .then(() => response.send('Delete complete'))
  .catch(console.error);
});


app.get('*', (request, response) => response.sendFile('index.html', { root: './public' }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

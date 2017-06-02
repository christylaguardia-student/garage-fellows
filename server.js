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

app.get('/', (request, response) => {
  client.query(`
    SELECT *
    FROM inventory
    INNER JOIN vehicles ON vehicles.vehicleId = inventory.vehicleId
    INNER JOIN users ON users.userId = inventory.userId`)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

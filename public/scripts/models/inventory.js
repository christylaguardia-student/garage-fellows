'use strict';

(function(module) {

function Inventory(item) {
  this.inventoryid = item.inventoryid;
  this.year = item.year;
  this.make = item.make;
  this.model = item.model;
  this.partname = item.partname;
  this.description = item.description;
  this.price = item.price;
  this.email = item.email;
  this.zipcode = item.zipcode;
  this.datecreated = item.datecreated;
  this.daysAgo = item.daysAgo;

  // if record does not have an imagesource, use the default
  if (item.imagesource == null) {
    this.imagesource = "default.png";
  } else {
    this.imagesource = item.imagesource;
  };
}

Inventory.all = [];

Inventory.prototype.toHtml = function() {
  var template = Handlebars.compile($('#inventory-template').html());

  // format the date nicely
  var date = new Date(this.datecreated);
  this.datecreated = date.toString("M/d/yyyy");

  // calculated how many days posted
  var daysElapsed = parseInt((new Date() - date)/60/60/24/1000);
  if (daysElapsed < 1) { daysElapsed = "today"; }
  else if (daysElapsed <= 1) { daysElapsed += " day ago"; }
  else if (daysElapsed >= 1 && daysElapsed < 7) { daysElapsed += " days ago"; }
  else if (daysElapsed >= 7 && daysElapsed < 14) { daysElapsed = "a week ago"; }
  else if (daysElapsed >= 14 && daysElapsed < 21) { daysElapsed = "two weeks ago"; }
  else if (daysElapsed >=21) { daysElapsed = "a long time ago"; }
  this.daysAgo = daysElapsed;

  // remove dollar signs from price
  this.priceNum = parseFloat(this.price.replace(/[$,]+/g,""));

  return template(this);
};

Inventory.loadAll = rows => {
  Inventory.all = rows.map(ele => new Inventory(ele));
  localStorage.setItem('search_results', JSON.stringify(Inventory.all));
}

Inventory.fetchAll = callback => {
  // console.log('fetching the inventory data now...');
  $.get('/inventory')
  .then(
    results => {
      Inventory.loadAll(results);
      callback();
    }
  )
}

module.Inventory = Inventory;
})(window);

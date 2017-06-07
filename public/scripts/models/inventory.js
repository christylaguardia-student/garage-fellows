'use strict';

(function(module) {

  function Inventory(item) {
    this.inventoryid = item.inventoryid;
    // this.vehicleid = item.vehicleid;
    this.year = item.year;
    this.make = item.make;
    this.model = item.model;
    this.partname = item.partname;
    this.description = item.description;
    this.price = item.price;
    // this.userid = item.userid;
    this.email = item.email;
    this.zipcode = item.zipcode;
    this.datecreated = item.datecreated;
    this.daysAgo = item.daysAgo;
  }

  Inventory.all = [];

  Inventory.prototype.toHtml = function() {
    var template = Handlebars.compile($('#inventory-template').html());

    // format the date nicely
    var date = new Date(this.datecreated);
    this.datecreated = date.toString("ddd, MMMM d, yyyy");

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
  }

  Inventory.fetchAll = callback => {
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

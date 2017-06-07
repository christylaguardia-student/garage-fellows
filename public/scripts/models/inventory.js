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
  }

  Inventory.all = [];

  Inventory.prototype.toHtml = function() {
    var template = Handlebars.compile($('#inventory-template').html());
    var date = new Date(this.datecreated);
    this.datecreated = date.toString("dddd, MMMM d, yyyy");
    // TODO: add days ago
    //this.daysAgo = parseInt((new Date() - date)/60/60/24/1000);
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

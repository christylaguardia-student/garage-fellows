'use strict';

(function(module) {
  const inventoryView = {};

  inventoryView.initIndexPage = function() {
    // remove existing
    $('#inventory').find('article').remove();
    console.log('inventory removed from page');

    // add all inventory
    Inventory.all.forEach(function(a) {
      $('#inventory').append(a.toHtml());
    });
    console.log('inventory added to page');
    console.log('inventory count', Inventory.all.length);
    console.log('inventory on page count', $('#inventory').find('article').length);
  }

  inventoryView.handleSortBy = function() {
    $('#inventory-sort').on('change', function() {

      // check what the user selected
      var selected = $(this).val();
      console.log('the user picked sort by', selected);

      // sort the inventory
      if (selected === "priceAsc") {

        Inventory.all.sort(function(a, b) {
          return a.priceNum - b.priceNum
        });

      } else if (selected === "priceDesc") {

        Inventory.all.sort(function(a, b) {
          return b.priceNum - a.priceNum
        });

      } else if (selected === "partnameAsc") {

        Inventory.all.sort(function(a, b) {
          var partA = a.partname.toUpperCase();
          var partB = b.partname.toUpperCase();
          if (partA < partB) { return -1; }
          if (partA > partB) { return 1; }
          return 0;
        })

      } else if (selected === "partnameDesc") {

        Inventory.all.sort(function(a, b) {
          var partA = a.partname.toUpperCase();
          var partB = b.partname.toUpperCase();
          if (partA > partB) { return -1; }
          if (partA < partB) { return 1; }
          return 0;
        })

      }

      inventoryView.initIndexPage();
    })
  }

  inventoryView.handleSortBy();

  module.inventoryView = inventoryView;
})(window);

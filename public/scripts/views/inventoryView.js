'use strict';

(function(module) {
  const inventoryView = {};

  inventoryView.initIndexPage = function() {
    Inventory.all.map(function(a) {
      $('#inventory').append(a.toHtml());
    });
    console.log('inventory added to page');
    searchFilters();
  }

  inventoryView.handleSortBy = function() {
    $('#inventory-sort').on('change', function() {
      // check what the user selected
      var selected = $(this).val();
      console.log('the user picked sort by', selected);

      // sort the inventory articles
      // TODO: this is not working
      if (selected === "priceDesc") {
        Inventory.all.sort(function(a,b) { return (parseInt(a.price) > parseInt(b.price)) });
      } else if (selected === "priceAsc") {
        Inventory.all.sort(function(a,b) { return (parseInt(a.price) < parseInt(b.price)) });
      }
    })
  }

  inventoryView.handleSortBy();

  module.inventoryView = inventoryView;
})(window);

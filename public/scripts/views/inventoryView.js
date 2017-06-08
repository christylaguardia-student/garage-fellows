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

      // sort the inventory
      if (selected === "priceAsc") {
        Inventory.all.sort(function(a, b) { return a.priceNum > b.priceNum });
      } else if (selected === "priceDesc") {
        Inventory.all.sort(function(a, b) { return a.priceNum < b.priceNum });
      } else if (selected === "partnameAsc") {
        Inventory.all.sort(function(a, b) { return a.partname > b.partname });
      } else if (selected === "partnameDesc") {
        Inventory.all.sort(function(a, b) { return a.partname < b.partname });
      }

      // remove the un-sorted inventory
      $('#inventory').find('article').remove();

      // add the sorted inventory
      inventoryView.initIndexPage();
    })
  }

  inventoryView.handleSortBy();

  module.inventoryView = inventoryView;
})(window);

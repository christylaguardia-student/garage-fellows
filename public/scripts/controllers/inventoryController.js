'use strict';

(function(module) {
  const inventoryController = {};

  // inventoryController.loadAll = function() {
  //   console.log('inventory data has been fetched');
  //   Inventory.fetchAll(inventoryView.index);
  // }

  inventoryController.index = function() {
    Inventory.fetchAll(inventoryView.initIndexPage);
  }

  module.inventoryController = inventoryController;
})(window);

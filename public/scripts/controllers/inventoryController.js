'use strict';

(function(module) {
  const inventoryController = {};

  inventoryController.loadAll = function() {
    console.log('inventory data has been loaded');
  }

  module.inventoryController = inventoryController;
})(window);

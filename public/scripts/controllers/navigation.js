'use strict';

(function(module) {
  const navigation = {};

  navigation.loadHomePage = function() {
    Inventory.fetchAll(inventoryView.initIndexPage);
    $('.tab-content').hide();
    $('#home').fadeIn(1000);
  }

  navigation.loadSearchPage = function() {
    searchFilters();
    $('.tab-content').hide();
    $('#search').fadeIn(1000);
  }

  navigation.loadInventoryPage = function() {
    $('.tab-content').hide();
    $('#inventory').fadeIn(1000);
  }

  navigation.loadNewPage = function() {
    $('.tab-content').hide();
    $('#add-inventory').fadeIn(1000);
  }

  module.navigation = navigation;
})(window);

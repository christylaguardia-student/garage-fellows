'use strict';

(function(module) {
  const navigation = {};

  navigation.loadIndexPage = function() {
    Inventory.fetchAll(inventoryView.initIndexPage);
    $('.tab-content').hide();
    $('#home').fadeIn(1000);
  }

  navigation.loadHomePage = function() {
    $('.tab-content').hide();
    $('#home').fadeIn(1000);
  }

  navigation.loadSearchPage = function() {
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

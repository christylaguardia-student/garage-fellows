'use strict';

(function(module) {
  const navigation = {};

  navigation.loadIndexPage = function() {
    // console.log('loading the index page');
    Inventory.fetchAll(inventoryView.initIndexPage);
    $('.tab-content').hide();
    $('#home').fadeIn(1000);
  }

  navigation.loadHomePage = function() {
    // console.log('loading the home page');
    $('.tab-content').hide();
    $('#home').fadeIn(1000);
  }

  navigation.loadSearchPage = function() {
    // console.log('loading the search page');
    $('.tab-content').hide();
    $('#search').fadeIn(1000);
  }

  navigation.loadInventoryPage = function() {
    // console.log('loading the inventory page');
    inventoryView.initIndexPage();
    // console.log('>>>>>> init the index page <<<<<<<<');
    $('.tab-content').hide();
    $('#inventory').fadeIn(1000);
  }

  navigation.loadNewPage = function() {
    // console.log('loading the new inventory page');
    $('.tab-content').hide();
    $('#add-inventory').fadeIn(1000);
  }

  module.navigation = navigation;
})(window);

'use strict';

(function(module) {
  const inventoryView = {};

  inventoryView.initIndexPage = function() {
    // remove existing
    $('#inventory').find('article').remove();

    // get data from local storage
    if (Inventory.all.length === 0) {
      Inventory.all = JSON.parse(localStorage.getItem('search_results')).map(ele => new Inventory(ele));
    }

    // add all inventory
    Inventory.all.forEach(function(a) {
      $('#inventory').append(a.toHtml());
    });
  }

  inventoryView.getCounts = function() {
    // get total count of inventory
    $.get('/count-inventory')
    .then(
      results => {
        $('#part-count').text(`${results[0].count} Parts`);
      });

    // get count of unique users
    // $.get('/count-users')
    // .then(
    //   results => {
    //     // var count = results[0].count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // format with commas
    //     $('#user-count').text(`${results[0].count} Users`);
    //   });

    // get sum of Inventory
    // $.get('/sum-price')
    // .then(
    //   results => {
    //     var sum = parseFloat(results[0].sum.replace(/[$,]+/g,""));
    //     $('#price-sum').text(`${results[0].sum}`);
    //   });
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
  inventoryView.getCounts();

  module.inventoryView = inventoryView;
})(window);

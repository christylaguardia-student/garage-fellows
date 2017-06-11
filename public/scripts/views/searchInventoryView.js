'use strict';

(function (module) {

  //create array in the object to hold all functions for the form
  const searchView = {};

  searchView.fetchAllYears = callback => {
    $.get('iyears')
    .then(
      results => {
        callback(results);
      }
    )
  };

  searchView.populateYearSelector = rows => {
    rows.map(function(obj) {
      return obj.year;
    })
    .forEach(function(val) {
      let optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#search-year option[value="${val}"]`).length === 0) {
        $('#search-year').append(optionTag);
      }
    })
  };

  searchView.fetchMakesForYear = function() {
    // get the makes for the selected year
    $.get('imakes', {
      year: $('#search-year').val()
    })
    .then(
      results => {
        // console.log('make results', results);
        results.map(function(obj) {
          return obj.make;
        })
        .sort()
        .forEach(function(val) {
          // create an option tag for each make
          let optionTag = `<option value="${val}">${val}</option>`;
          if ($(`#search-make option[value="${val}"]`).length === 0) {
            $('#search-make').append(optionTag);
          }
        })
      }
    )
  };

  searchView.populateMakeSelector = function() {
    // populate the make dropdown after a year is selected
    $('#search-year').on('change', function() {
      // clear the existing options
      $('#search-make').children().not(':first').remove();
      $('#search-model').children().not(':first').remove();

      searchView.fetchMakesForYear();
    })
  };

  searchView.fetchModelsForMakeAndYear = function() {
    // get the models for the selected year and make
    $.get('imodels', {
      year: $('#search-year').val(),
      make: $('#search-make').val()
    })
    .then(
      results => {
        // console.log('model results', results);
        results.map(function(obj) {
          return obj.model;
        })
        .sort()
        .forEach(function(val) {
          // create an option tag for each model
          let optionTag = `<option value="${val}">${val}</option>`;
          if ($(`#search-model option[value="${val}"]`).length === 0) {
            $('#search-model').append(optionTag);
          }
        })
      }
    )
  };

  searchView.populateModelSelector = function() {
    // populate the model dropdown after a year is selected
    $('#search-make').on('change', function() {
      // clear the existing options
      $('#search-model').children().not(':first').remove();

      searchView.fetchModelsForMakeAndYear();
    })
  };

  searchView.fetchInventory = function(){
    $('#search-model').on('change', function(){
      $.get('search-inventory', {
        year: $('#search-year').val(),
        make: $('#search-make').val(),
        model: $('#search-model').val()
      })
      .then(
        results => {
          searchView.loadAll(results);
        }
      )
    })
  }

  // this is the thing that does the search!!!!!!!!!!!
  searchView.loadAll = rows => {
    Inventory.all = rows.map(ele => new Inventory(ele));
    localStorage.setItem('search_results', JSON.stringify(Inventory.all));
   // console.log('search data put in local storage');

    inventoryView.initIndexPage();
   // console.log(Inventory.all);
  }

  searchView.fetchAllYears(searchView.populateYearSelector);
  searchView.populateMakeSelector();
  searchView.populateModelSelector();
  searchView.fetchInventory();

  module.searchView = searchView;
})(window);

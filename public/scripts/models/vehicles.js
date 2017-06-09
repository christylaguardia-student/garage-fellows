'use strict';

(function (module) {

//get all the data from vehicle table in db
  function Vehicle(sourceData) {
    this.year = sourceData.year;
    this.make = sourceData.make;
    this.model = sourceData.model;
  };

  //create array in the object to hold all functions for the form
  Vehicle.all = [];

  Vehicle.fetchAllYears = callback => {
    $.get('vehicle_years')
    .then(
      results => {
        callback(results);
      }
    )
  };

  Vehicle.populateYearSelector = rows => {
    rows.map(function(obj) {
      return obj.year;
    })
    .forEach(function(val) {
      let optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#add-year option[value="${val}"]`).length === 0) {
        $('#add-year').append(optionTag);
      }
    })
  };

  Vehicle.fetchMakesForYear = function() {
    // get the makes for the selected year
    $.get('vehicle_makes', {
      year: $('#add-year').val()
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
          if ($(`#add-make option[value="${val}"]`).length === 0) {
            $('#add-make').append(optionTag);
          }
        })
      }
    )
  };

  Vehicle.populateMakeSelector = function() {
    // populate the make dropdown after a year is selected
    $('#add-year').on('change', function() {
      // clear the existing options
      $('#add-make').children().not(':first').remove();
      $('#add-model').children().not(':first').remove();

      Vehicle.fetchMakesForYear();
    })
  };

  Vehicle.fetchModelsForMakeAndYear = function() {
    // get the models for the selected year and make
    $.get('vehicle_models', {
      year: $('#add-year').val(),
      make: $('#add-make').val()
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
          if ($(`#add-model option[value="${val}"]`).length === 0) {
            $('#add-model').append(optionTag);
          }
        })
      }
    )
  };

  Vehicle.populateModelSelector = function() {
    // populate the model dropdown after a year is selected
    $('#add-make').on('change', function() {
      // clear the existing options
      $('#add-model').children().not(':first').remove();

      Vehicle.fetchModelsForMakeAndYear();
    })
  };

  Vehicle.fetchAllYears(Vehicle.populateYearSelector);
  Vehicle.populateMakeSelector();
  Vehicle.populateModelSelector();


  module.Vehicle = Vehicle;
})(window);



  /////////////////// DON'T USE THIS //////////////////

  // Vehicle.getYears = function (callback) {
  //   $.ajax({
  //     url: '/years',
  //     method: 'GET',
  //   }).done((data) => {
  //     console.log(data);
  //   }).fail((err) => {
  //     console.error(err);
  //   })
  // };
  //
  // Vehicle.getMakes = function (ctx, next) {
  //   $.ajax({
  //     url: `/makes?year=${ctx.params.year}`,
  //     method: 'GET',
  //   }).done((data) => {
  //     console.log(data);
  //   }).fail((err) => {
  //     console.error(err);
  //   })
  // };
  //
  // Vehicle.getModels = function (ctx, next) {
  //   $.ajax({
  //     url: `/models?year=${ctx.params.year}&make=${ctx.params.make}`,
  //     method: 'GET',
  //   }).done((data) => {
  //     console.log(data);
  //   }).fail((err) => {
  //     console.error(err);
  //   })
  // };

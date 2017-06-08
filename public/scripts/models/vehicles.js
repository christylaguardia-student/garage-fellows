'use strict';

//----> doner script from portfolio------>

// (function (module) {

//get all the data from vehicle table in db
function Vehicle(sourceData) {
  this.year = sourceData.year;
  this.make = sourceData.make;
  this.model = sourceData.model;

};

//create array in the object to hold all functions for the form
Vehicle.all = [];



  Vehicle.getYears = function (callback) {

    $.ajax({
      url: '/years',
      method: 'GET',
    })
      err => {
        console.error(err)
      }
      
  };

  Vehicle.getMakes = function (ctx, next) {

    $.ajax({
      url: `/makes?year=${ctx.params.year}`,
      method: 'GET',
    })
      err => {
        console.error(err)
      }
      
  };

  Vehicle.getModels = function (callback) {


    $.ajax({
      url: '/models',
      method: 'GET',
    })
      err => {
        console.error(err)
      }
      
  };



  module.vehicle = vehicle;
})(window);

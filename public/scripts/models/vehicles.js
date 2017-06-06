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
vehicle.all = [];



  vehicle.getYears = function (callback) {

    $.ajax({
      url: '/years',
      method: 'GET',
    })
      err => {
        console.error(err)
      }
      
  };


  module.vehicle = vehicle;
})(window);

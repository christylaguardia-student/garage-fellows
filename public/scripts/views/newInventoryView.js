'use strict';

(function(module) {
  const newInventoryView = {};

  // newInventoryView.create = function() {
    $('#add-button').click(function() {
      $.post('/new',
        {
          // QUESTION: how should we get the vehicleid?
          vehicleid: '1',
          partname: $('#add-partname').val(),
          description: $('#add-description').val(),
          price: $('#add-price').val(),
          userfirstname: $('#add-firstname').val(),
          userlastname: $('#add-lastname').val(),
          email: $('#add-email').val(),
          zipcode: $('#add-zipcode').val(),
          datecreated: Date.today().toString('yyyy-MM-dd')
        }
      );
    })
  // }

  module.newInventoryView = newInventoryView;
})(window);

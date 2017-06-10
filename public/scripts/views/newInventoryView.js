'use strict';

(function(module) {
  const newInventoryView = {};

  // newInventoryView.create = function() {
    $('#add-button').click(function() {
      $.post('/new',
        {
          year: $('#add-year').val(),
          make: $('#add-make').val(),
          model: $('#add-model').val(),
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
      $('#upload').addClass('jumbotron').html('<h3>Thanks for posting, you can see this add on the inventory page on our website</h3>');
    })

  module.newInventoryView = newInventoryView;
})(window);

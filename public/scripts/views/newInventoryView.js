'use strict';

(function(module) {
  const newInventoryView = {};

  newInventoryView.create = function() {
    $('#add-button').click(function() {

      if ($('#add-button').text() == 'Create Another Listing') {
        newInventoryView.hideSucessMsg();
      } else {
        $.post('/new',
          {
            year: $('#add-year').val(),
            make: $('#add-make').val(),
            model: $('#add-model').val(),
            partname: $('#add-partname').val(),
            description: $('#add-description').val(),
            price: parseInt($('#add-price').val()),
            userfirstname: $('#add-firstname').val(),
            userlastname: $('#add-lastname').val(),
            email: $('#add-email').val(),
            zipcode: parseInt($('#add-zipcode').val()),
            datecreated: Date.today().toString('yyyy-MM-dd')
          })
        .done(
          newInventoryView.showSucessMsg()
        )
      }
    })
  }

  newInventoryView.showSucessMsg = function() {
    $('#upload').addClass('jumbotron').html('<h3>Thanks for posting! You can see view your ad <a href="/shop">here</a>.</h3>');
    $('#add-button').text('Create Another Listing');
  }

  newInventoryView.hideSucessMsg = function() {
    $('#add-form')[0].reset();
    $('#upload').removeClass('jumbotron').html('');
    $('#add-button').text('Create Listing');
  }

  newInventoryView.create();

  module.newInventoryView = newInventoryView;
})(window);

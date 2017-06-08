var populateYear = function() {
    let years = $('article').map(function() {
      if (!$(this).hasClass('template')) {
        return $(this).attr('inventory-year');
      }
    });
    years = years.sort((a, b) => b > a );
    years.each(function(i, val) {
      let optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#search-year option[value="${val}"]`).length === 0) {
        $('#search-year').append(optionTag);
      }
    });
    $('#search-year').on('change', function(){
      console.log('kkkk', $(this).val());
      populateMake($(this).val());
    });
  }

var populateMake = function(year) {
    $('#search-make').prop('disabled', false);
    let makes = $('article').map(function() {
      if (!$(this).hasClass('template') && $(this).attr('inventory-year') === year) {
        return $(this).attr('inventory-make');
      }
    });
    makes = makes.sort();
    makes.each(function(i, val) {
      let optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#search-make option[value="${val}"]`).length === 0) {
        $('#search-make').append(optionTag);
      }
    });
    $('#search-make').on('change', function(){
      console.log('mmmm', $(this).val());
      populateModel($(this).val());
    });
  }

var populateModel = function(make) {
    $('#search-model').prop('disabled', false);
    let models = $('article').map(function() {
      if (!$(this).hasClass('template') && $(this).attr('inventory-make') === make) {
        return $(this).attr('inventory-model');
      }
    });
    models = models.sort();
    models.each(function(i, val) {
      let optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#search-model option[value="${val}"]`).length === 0) {
        $('#search-model').append(optionTag);
      }
    });
  }

  handleSearchFilter = function() {
      $('#search-year').on('change', function() {
        if ($(this).val()) {
          $('article').hide();
          $(`article[inventory-year="${$(this).val()}"]`).fadeIn();
        } else {
          $('article').fadeIn();
        }
        $('#search-make').val('');
        $('#search-model').val('');
      });
    };

  var searchFilters = function(){
    populateYear();
    handleSearchFilter();
  };

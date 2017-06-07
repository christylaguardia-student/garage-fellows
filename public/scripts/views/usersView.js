var populateYear = function() {
  var years = $('article').map(function() {
    if (!$(this).hasClass('template')) {
      return $(this).attr('inventory-year');
    }
  });
  years = years.sort((a, b) => b > a );
  console.log(years);
  years.each(function(i, val) {
    let optionTag = `<option value="${val}">${val}</option>`;
    if ($(`#search-year option[value="${val}"]`).length === 0) {
      $('#search-year').append(optionTag);
    }
  });
  $('#search-year').change(populateMake());
}


var populateMake = function() {
  $('#search-make').prop('disabled', false);
  var makes = $('article').map(function() {
    if (!$(this).hasClass('template')) {
      return $(this).attr('inventory-make');
    }
  });
  makes = makes.sort();
  console.log(makes);
  makes.each(function(i, val) {
    let optionTag = `<option value="${val}">${val}</option>`;
    if ($(`#search-make option[value="${val}"]`).length === 0) {
      $('#search-make').append(optionTag);
    }
  });
}

var populateModel = function() {
  var models = $('article').map(function() {
    if (!$(this).hasClass('template')) {
      return $(this).attr('inventory-model');
    }
  });
  models = models.sort();
  console.log(models);
  models.each(function(i, val) {
    let optionTag = `<option value="${val}">${val}</option>`;
    if ($(`#search-model option[value="${val}"]`).length === 0) {
      $('#search-model').append(optionTag);
    }
  });
}

var searchFilters = function(){
  populateYear();
  // populateMake();
  // populateModel();
};















// handleAuthorFilter = function() {
//     $('#author-filter').on('change', function() {
//       if ($(this).val()) {
//         $('article').hide();
//         $(`article[data-author="${$(this).val()}"]`).fadeIn();
//       } else {
//         $('article').fadeIn();
//         $('article.template').hide();
//       }
//       $('#category-filter').val('');
//     });
//   };

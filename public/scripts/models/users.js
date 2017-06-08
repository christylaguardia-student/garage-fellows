(function(module){

  function User(opt){
    this.userFirstName = opt.userFirstName;
    this.userLastName = opt.userLastName;
    this.email = opt.email;
    this.zipCode = opt.zipCode;
  }

  User.all = [];

  User.loadAll = rows => {
    User.all = rows.map(ele => new User(ele));
  };

User.fetchAll = callback => {
    $.get('/users')
    .then(
      results => {
        User.loadAll(results);
        callback();
      }
    )
  };

module.User = User;
})(window);

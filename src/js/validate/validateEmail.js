(function() {

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  var emailElement = ".details label input[type=email]";
  function validate() {
    var email = $(".details label input[type=email]").val();
    if (validateEmail(email)) {
      $(emailElement).closest('.details').addClass('has-success');
      $(emailElement).addClass('form-control-success');
    } else {
      $(emailElement).closest('.details').addClass('has-danger');
      $(emailElement).addClass('form-control-danger');
    }
    return false;
  }
  $(emailElement).keyup(function(){
      $(this).removeClass('form-control-danger form-control-success');
      $(this).closest('.details').removeClass('has-success has-danger');
      validate();
    });
})();

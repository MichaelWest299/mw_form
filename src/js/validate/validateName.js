(function() {

  function validateName(name) {
    var re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name);
  }
  var nameElement = ".details label input[type=text]";
  function validate() {
    var name = $(".details label input[type=text]").val();
    if (validateName(name)) {
      $(nameElement).closest('.details').addClass('has-success');
      $(nameElement).addClass('form-control-success');
    } else {
      $(nameElement).closest('.details').addClass('has-danger');
      $(nameElement).addClass('form-control-danger');
    }
    return false;
  }
  $(nameElement).keyup(function(){
      $(this).removeClass('form-control-danger form-control-success');
      $(this).closest('.details').removeClass('has-success has-danger');
      validate();
    });
})();

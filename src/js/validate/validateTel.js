(function() {

  function validateTel(tel) {
    var re = /^(?:[-(). +]*[0-9]){11,}[-\s\.()+]{0,}[-\s\./0-9]*$/;
    return re.test(tel);
  }
  var telElement = ".details label input[type=tel]";
  function validate() {
    var tel = $(".details label input[type=tel]").val();
    if (validateTel(tel)) {
      $(telElement).closest('.details').addClass('has-success');
      $(telElement).addClass('form-control-success');
    } else {
      $(telElement).closest('.details').addClass('has-danger');
      $(telElement).addClass('form-control-danger');
    }
    return false;
  }
  $(telElement).keyup(function(){
      $(this).removeClass('form-control-danger form-control-success');
      $(this).closest('.details').removeClass('has-success has-danger');
      validate();
    });
})();

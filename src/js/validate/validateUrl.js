(function() {

  function validateUrl(url) {
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return re.test(url);
  }
  var urlElement = ".details label input[type=url]";
  function validate() {
    var url = $(".details label input[type=url]").val();
    if (validateUrl(url)) {
      $(urlElement).closest('.details').addClass('has-success');
      $(urlElement).addClass('form-control-success');
    } else {
      $(urlElement).closest('.details').addClass('has-danger');
      $(urlElement).addClass('form-control-danger');
    }
    return false;
  }
  $(urlElement).keyup(function(){
      $(this).removeClass('form-control-danger form-control-success');
      $(this).closest('.details').removeClass('has-success has-danger');
      validate();
    });
})();

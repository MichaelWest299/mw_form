(function(){

  //Set of regex objects
  var regexpressions = {
  	name: {
  		regex: /^[a-zA-Z ]{2,30}$/,
  		elementid: ".details label input[type=text]",
  	},
  	email: {
  		regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  		elementid: ".details label input[type=email]"
  	},
  	telephone: {
      regex: /^(?:[-(). +]*[0-9]){11,}[-\s\.()+]{0,}[-\s\./0-9]*$/,
      elementid: ".details label input[type=tel]"
  	},
    url: {
      regex: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
      elementid: ".details label input[type=url]"
    }
  };

  //Our main validation function for each detail
  var testThis = function(regEx, elementId)
  {
    //Returns true if validation passes
    function validateInput(inputValue) {
      return regEx.test(inputValue);
    }
    //Add tick or cross depending whether input is correct
    function validate() {
      var inputValue = $(elementId).val();
      if (validateInput(inputValue)) {
        $(elementId).closest('.details').addClass('has-success');
        $(elementId).addClass('form-control-success');
      } else {
        $(elementId).closest('.details').addClass('has-danger');
        $(elementId).addClass('form-control-danger');
      }
    }
    //Remove any pre-existing validation classes before validating
    $(elementId).keyup(function(){
        $(elementId).removeClass('form-control-danger form-control-success');
        $(elementId).closest('.details').removeClass('has-success has-danger');
        validate();
    });
  };

  //Feed in each regex object into the above function so that all details are validated
  for (var key in regexpressions) {
  		var obj = regexpressions[key];
  		testThis(obj.regex, obj.elementid);
  }

  //Stops the user from proceeding without all valid detail fields
  $(".details label input").keyup(function(){
      if ($(".details.has-success").length == $(".details").length) {
        $('.next-details').prop("disabled", null);
        $('.next-details').css("border-color","green");
      } else {
        $('.next-details').prop("disabled", true);
        $('.next-details').css("border-color","red");
      }
  });
})();

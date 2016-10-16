//Define global namespace
var mw_app = mw_app || {};

mw_app.validation = (function() {

  //Define regular expressions object
  var regexpressions = {
    text: /^[a-zA-Z ]{2,30}$/,
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    tel: /^(?:[-(). +]*[0-9]){11,}[-\s\.()+]{0,}[-\s\./0-9]*$/,
    url: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
  };

  //Find next button, all inputs and successful inputs
  var _cacheDom = function() {
    this.details = $('.details');
    this.detailsNext = $('.next-details');
    this.inputElements = this.details.find('input');
    this.hasSuccess = this.details.find('.form-control-success');
  };

  //Apply validation to every detail input element in dom
  var _validate = function() {
    for (var i = 0; i < this.inputElements.length; i++) {
      _applyRegExByType(this.inputElements[i]);
    }
  };

  //Comparing the dom input type with the key from regexpressions - to apply the correct regex
  var _applyRegExByType = function(currentInputElement) {
    for (var regExType in regexpressions) {
      var regex = regexpressions[regExType];
      if (currentInputElement.type == regExType) {
        _setInputFieldRegexType(regex, currentInputElement);
      }
    }
  };

  //After any user input, apply the regex to the chosen element
  var _setInputFieldRegexType = function(regex, currentInputElement) {
    $(currentInputElement).on('input', function(e) {
      var test = regex.test($(currentInputElement).val());
      _setValidationClasses(currentInputElement, test);
    });
  };

  //Enable the next button when all fields have passed validation
  var _validateNextButton = function() {
    _cacheDom();
    if (this.hasSuccess.length == this.details.length) {
      this.detailsNext
        .prop("disabled", null)
        .css("border-color", "green");
    } else {
      this.detailsNext
        .prop("disabled", true)
        .css("border-color", "red");
    }
  };

  //Sets visual tick or cross beside input for success/failure of regex test
  var _setValidationClasses = function(currentInputElement, test) {
    _removeExistingClasses(currentInputElement);
    if (test) {
      $(currentInputElement)
        .addClass('form-control-success')
        .parents(':eq(1)').addClass('has-success');
    } else {
      $(currentInputElement)
        .addClass('form-control-danger')
        .parents(':eq(1)').addClass('has-danger');
    }
    _validateNextButton();
  };

  //Clear input element of any left-over classes from the last round of validation
  var _removeExistingClasses = function(currentInputElement) {
    $(currentInputElement).removeClass('form-control-danger form-control-success');
    $(currentInputElement).parents(':eq(1)').removeClass('has-success has-danger');
  };

  var init = function() {
    _cacheDom();
    _validate();
  };
  return {
    init: init
  };
})();

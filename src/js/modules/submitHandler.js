//Define global namespace
var mw_app = mw_app || {};

mw_app.submitHandler = (function() {

  //Allows a form submission to be transformed into a json object
  (function() {
    $.fn._serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };
  })();

  //Prevent enter key form submission
  var _preventEnterSubmit = function() {
      $('form input').on('keypress', function(e) {
        return e.which !== 13;
      });
  };

  //Create json object upon form submission
  var _createJsonOnSubmission = function() {
      $('form').on('submit', function(e) {
        var answerData = $(this)._serializeObject();
        console.log(answerData);
        return false;
      });
  };

  var init = function() {
    _preventEnterSubmit();
    _createJsonOnSubmission();
  };
  
  return {
    init: init
  };
})();

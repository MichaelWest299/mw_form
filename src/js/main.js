//Define global namespace
var mw_app = mw_app || {};

mw_app.jsonHandler = (function() {

  //Fetch the JSON data from formdata.json to allow us to populate the form
  var _ajaxCall = function() {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': '../data/formdata.json',
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
  };

  //This will be parsed to _renderHandlebars
  var fetchedJson = _ajaxCall();

  //Allows us to check JSON values in hb i.e. type - we then conditionally render handlebars for that type
  var _registerHandlebarsHelp = function() {
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });
  };

  var _compileHandlebars = function(fetchJson) {

    //Pre compile the handlebars
    var formContainerScript = MyApp.templates.formContainer(fetchedJson),
      formContentScript = MyApp.templates.formContent(fetchedJson);

    //Append pre-compiled handlebars to the DOM, namely the container and content
    $('body').append(formContainerScript);
    $('.content').append(formContentScript);
  };

  //Pre render the handlebars
  var _renderHandlebars = function(fetchedJson) {
    _registerHandlebarsHelp();
    _compileHandlebars(fetchedJson);
  };

  var init = function() {
    _renderHandlebars(fetchedJson);
  };

  return {
    init: init
  };
})();

mw_app.dynamicLoad = (function() {

  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  var _cacheDom = function() {
    this.$visible = $('fieldset:visible');
  };

  var _animationSettings = {
    duration: 800,
    stepNext: function(now) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50) + "%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 0.7 - now;
      current_fs.css({
        'transform': 'scale(' + scale + ')'
      });
      next_fs.css({
        'left': left,
        'opacity': opacity
      });
    },
    stepPrev: function(now) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1 - now) * 50) + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 0.7 - now;
      current_fs.css({
        'left': left
      });
      previous_fs.css({
        'transform': 'scale(' + scale + ')',
        'opacity': opacity
      });
    },
    complete: function() {
      current_fs.hide();
      animating = false;
    }
  };

  var _animateNext = function() {
    if (animating) return false;
    animating = true;
    _cacheDom();
    current_fs = this.$visible;
    next_fs = this.$visible.next();
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now) {
        _animationSettings.stepNext(now);
      },
      duration: _animationSettings.duration,
      complete: function() {
        _animationSettings.complete();
      }
    });
  };

  var _animatePrev = function() {
    if (animating) return false;
    animating = true;
    _cacheDom();
    current_fs = this.$visible;
    previous_fs = this.$visible.prev();
    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now) {
        _animationSettings.stepPrev(now);
      },
      duration: _animationSettings.duration,
      complete: function() {
        _animationSettings.complete();
      }
    });
  };

  var _eventNext = function() {
    $('.next').on('click', function(e) {
      _animateNext();
    });
  };

  var _eventPrev = function() {
    $('.previous').on('click', function(e) {
      _animatePrev();
    });
  };

  var _eventStartAgain = function() {
    $('.startagain').on('click', function(e) {
      location.reload();
    });
  };

  var init = function() {
    _eventNext();
    _eventPrev();
    _eventStartAgain();
  };

  return {
    init: init
  };
}());

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
    $(function() {
      $('form input').on('keypress', function(e) {
        return e.which !== 13;
      });
    });
  };

  //Create json object upon form submission
  var _createJsonOnSubmission = function() {
    $(function() {
      $('form').submit(function() {
        var answerData = $(this)._serializeObject();
        console.log(answerData);
        // $('#output').text(JSON.stringify(answerData, undefined, 2));
        return false;
      });
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

//Load modules
mw_app.jsonHandler.init();
mw_app.dynamicLoad.init();
mw_app.validation.init();
mw_app.submitHandler.init();

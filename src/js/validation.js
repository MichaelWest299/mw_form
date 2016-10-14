(function(){

  var validation = {
    regexpressions : {
      text : /^[a-zA-Z ]{2,30}$/,
      email:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      tel:  /^(?:[-(). +]*[0-9]){11,}[-\s\.()+]{0,}[-\s\./0-9]*$/,
      url: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
    },

    init: function() {
        this.cacheDom();
        this.validate();
    },

    cacheDom: function() {
      this.details = $('.details');
      this.detailsNext = $('.next-details');
      this.inputElement = this.details.find('input');
      this.hasSuccess = this.details.find('.form-control-success');

    },

    validate: function() {
      for(var i = 0; i < this.inputElement.length; i++)
      {
        this.applyRegExByType(this.inputElement[i]);
      }
    },

    applyRegExByType: function(inputElement)
    {
      for(var regExType in validation.regexpressions) {
        var regex = validation.regexpressions[regExType];
        if(inputElement.type == regExType) {
            this.setInputFieldRegexType(regex, inputElement);
        }
      }
    },

    setInputFieldRegexType: function(regex, inputElement)
    {
      var self = this;
      $(inputElement).on('input', function(e) {
        var test = regex.test($(inputElement).val());
        self.setValidationClasses(inputElement, test);
      });
    },

    setValidationClasses: function(inputElement, test) {
      this.removeExistingClasses(inputElement);
      if(test) {
          $(inputElement)
          .addClass('form-control-success')
          .parents(':eq(1)').addClass('has-success');
        } else {
          $(inputElement)
          .addClass('form-control-danger')
          .parents(':eq(1)').addClass('has-danger');
      }
      this.validateNextButton();
    },

    removeExistingClasses: function(inputElement) {
      $(inputElement).removeClass('form-control-danger form-control-success');
      $(inputElement).parents(':eq(1)').removeClass('has-success has-danger');
    },

    validateNextButton: function() {
      this.cacheDom();
      if (this.hasSuccess.length == this.details.length) {
        this.detailsNext
          .prop("disabled", null)
          .css("border-color","green");
      } else {
        this.detailsNext
        .prop("disabled", true)
        .css("border-color","red");
      }
    }
  };

validation.init();

})();

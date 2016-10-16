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

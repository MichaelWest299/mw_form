(function() {

  //Fetch the JSON data from formdata.json to allow us to populate the form
  var html = '';
  var json = (function() {
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
  })();
  console.log(json);

  //Allows us to check JSON values in hb i.e. type - we then conditionally render handlebars for that type
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  //Pre render the handlebars
  var formContainerScript = MyApp.templates.formContainer(json),
    formContentScript = MyApp.templates.formContent(json);

  //Append pre-rendered handlebars to the DOM, namely the container and content
  $('body').append(formContainerScript);
  $('#content').append(formContentScript);

})();

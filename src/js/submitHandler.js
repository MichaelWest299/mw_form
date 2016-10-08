//submitHandler.js
//Uses serializeObject.js to obtain form data and transform it into a JSON object
(function() {
  $(function() {
    //Prevent enter key form submission
    $('form input').on('keypress', function(e) {
      return e.which !== 13;
    });
    //Create json object upon form submission
    $('form').submit(function() {
      var answerData = $(this).serializeObject();
      console.log(answerData);
      // $('#output').text(JSON.stringify(answerData, undefined, 2));
      return false;
    });
  });
})();

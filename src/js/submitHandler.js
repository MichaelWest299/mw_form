//submitHandler.js
//Uses serializeObject.js to obtain form data and transform it into a JSON object
(function() {
  $(function() {
    $('form').submit(function() {
      //Create json object upon form submission
      var answerData = $(this).serializeObject();
      console.log(answerData);
      // $('#output').text(JSON.stringify(answerData, undefined, 2));
      return false;
    });
  });
})();

(function() {
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

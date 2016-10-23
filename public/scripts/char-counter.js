$(function() {
  var max = 140 ;
  $(".new-tweet form textarea").on("keyup", function(event){
    var textarea = $(this)
    var currLength = max - textarea.val().length;
    var till140 = $(".new-tweet form .counter").text(currLength);
    if (currLength < 0){
      $(".new-tweet form .counter").css({"color":"red"});
    }
});
});

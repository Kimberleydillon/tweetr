$(function() {
  var max = 140 ;
  $(".new-tweet form textarea").on("keyup", function(event){
    var textarea = $(this)
    var currLength = max - textarea.val().length;
    $(".new-tweet form span").text(currLength);
});
});

//do max minus counter, dont just process counter.


// $(function(){//waiting for DOM to load
//    alert("Dont shut it!");
//   $("container").children(".counter").css({"color":"red"});

//   })


// $(function(){//waiting for DOM to load
//   $("button").on"click", function(eventObject){// find a tag named button
//     var domElement = eventObject.currentTarget;
//     console.log($(domElement));//special object that represents a dom object on the page
//     console.log("The button says: " + $(domElement).text());
//     alert("Hello");
//   }
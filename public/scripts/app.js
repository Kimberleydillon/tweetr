/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){

  function createTweetElement(tweobject) {
   var $tweet = $("<article>").addClass("thetweets");
   var time = Math.floor((Date.now() - tweobject.created_at)/8.64e+7)

   $tweet.append("<header>");
   $tweet.append("<main>");
   $tweet.append("<footer>");
   // HEADER
   $tweet.children("header").append(`<img src= ${tweobject.user.avatars.regular} />`);
   $tweet.children("header").append(`<h2 class= "name">${tweobject.user.name} </h2>`);
   $tweet.children("header").append(`<p class= "handle">${tweobject.user.handle} </p>`);
   // MAIN
   $tweet.children("main").append(`<p>${tweobject.content.text} </p>`);
   // FOOTER
   $tweet.children("footer").append(`<p>${time} days ago </p>`);
   $tweet.children("footer").append(`<i class="fa fa-heart" aria-hidden="true"></i>`);
   $tweet.children("footer").append(`<i class="fa fa-retweet" aria-hidden="true"></i>`);
   $tweet.children("footer").append(`<i class="fa fa-flag" aria-hidden="true"></i>`);

   return $tweet;
  }

  $('#composedTweet').on('submit',function (event) {
    event.preventDefault();
    var textfield = $(".tweetText").val();
    if (textfield == ""){
      $('.errorMsgs').text("Why don't you write a thing?")
    }
    else if (textfield.length > 140 ) {
       $('.errorMsgs').text("Fool! Thats too much!")
    } else{
    var tweetPost = $.ajax({
      method:'post',
      url:'/tweets/',
      data: $(this).serialize(),
      dataType:'json'
    });
    loadTweets();
   $(".tweetText").val("");
   $('.counter').text("140");
    };
});

  $('.new-tweet').hide(); //focus in input field when compose button toggled
 $('.button').click(function () { //compose button toggles input field
   $('.new-tweet').slideToggle( function (){
     $('.tweetText').focus()
   });
 });


    function loadTweets (){
      var allTweets = $.ajax({
        method:'get',
        url:'/tweets/',
        data:$(this).serialize(),
        dataType:'json'

      });
      allTweets.done(function(data){
        renderTweets(data);

      });

    }

  function renderTweets(arr) {
   for (var i = 0; i < arr.length; i++) {
     var currenTweet = arr[i];
     var $newtweet = createTweetElement(currenTweet)
     $('#feed').append($newtweet);
   }
  }
});
















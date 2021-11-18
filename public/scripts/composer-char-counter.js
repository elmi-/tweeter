$(document).ready(function() {
  // --- our code goes here ---
  const maxLength = 140;
  const counter = $(".counter");

  $("#tweet-text").on("input", function(event) {
    let tweetLength =  $(this).val().length;
    let charCount = maxLength - tweetLength;
    counter.html(charCount);

    if(tweetLength > maxLength) {
      counter.addClass("tooManyChars");
    } else {
      counter.removeClass("tooManyChars");
    }
  });
});
$(document).ready(function() {
  const maxLength = 140;
  const counter = $(".counter");

  $("#tweet-text").on("input", function(event) {
    let tweetLength =  $(this).val().length;
    let charCount = maxLength - tweetLength;
    counter.text(charCount);

    if (tweetLength > maxLength) {
      counter.addClass("tooManyChars");
    } else {
      counter.removeClass("tooManyChars");
    }
  });
});
/*
* Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  const $tweet = $(
    `
    <article class="tweet">
    <header>
        <div>
        <img src="${ tweet.user.avatars }" />
          <h1>${ tweet.user.name }</h1>
          </div>
          <h2>${ tweet.user.handle }</h2>
      </header>
      <p>
      ${ tweet.content.text }
      </p>
      <footer>
        <em class="date">${ timeago.format(tweet.created_at) }</em>
        <section class="icons">
        <em class="fas fa-flag"></em>
          <em class="fas fa-retweet"></em>
          <em class="fas fa-heart"></em>
        </section>
        </footer>
        </article>
    `);
    
    return $tweet;
};

const renderTweets = function(tweets) {
  $('#tweet-container').empty();

  for(const tweet of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
};

const toggleNewTweetSection = () => {
  newTweetSection = $(".new-tweet");
  newTweetSection.css("display", "none");

  $("#nav-call").on("click", function() {
    if (newTweetSection.is(":visible")) {
      newTweetSection.slideUp("slow");
      $("#nav-call span").text("write a new tweet");
      $("#nav-call em").removeClass("close");
    } else {
      newTweetSection.slideDown("slow");
      $("#tweet-text").focus();
      $("#nav-call span").text("hide tweet form");
      $("#nav-call em").addClass("close");
    }
  });
}

$(document).ready(function() {
  toggleNewTweetSection();

  // load saved tweets on page ready
  const loadtweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  loadtweets();

  $(".validation-error").css("display", "none");

  $(".new-tweet form").on("submit", function(e) {
    e.preventDefault();
    const tweet = $("#tweet-text");

    // validate form data is empty
    if (tweet.val() == "" ) {
      $(".validation-error").slideDown("slow", function() {
        this.innerText = "error: tweets cannot be empty #kthxbye";
      });
      return;
    }

    // validate form data exceeds the 140 character limit
    if (tweet.val().length > 140) {
      $(".validation-error").slideDown("slow", function() {
        this.innerText = "error: tweets cannot exceed 140 characters long #kthxbye";
      });
      return;
    }

    // remove error message if issues above resolved
    $(".validation-error").slideUp("slow");

    // post serialized form to /tweets route and load tweet
    $.post("/tweets", tweet.serialize(), (data) => {
      loadtweets();
    });

    // clear textarea and adjust counter to default once successfully posted
    $(".counter").text(140)
    tweet.val("");
  });
});

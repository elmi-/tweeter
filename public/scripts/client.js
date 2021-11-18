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
  // debugger;
  for(const tweet of tweets) {
    $('#tweet-container').append(createTweetElement(tweet));
  }
};

$(document).ready(function() {
  $(".new-tweet form").on("submit", function(e) {
    e.preventDefault();
    const form = $(this);

    //validate form data is empty, or exceeds the 140 character limit.
    const tweetLength = e.currentTarget[0].textLength;
    if(tweetLength == "" || tweetLength> 140) {
      alert("ERROR");
      return;
    }

    debugger;
    $.post("/tweets", form.serialize(), (data) => {
      console.log("data", data)
    });
  });

  const loadtweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  loadtweets(); 
});

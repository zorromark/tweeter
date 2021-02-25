/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {


const loadtweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (tweets) => {
      renderTweets(tweets);
    },
    error: (error) => {
      console.error(error);
    }
})
}

loadtweets();

const $tweetButton = $('.tweet-form');

$tweetButton.on('submit', function(event) {
  event.preventDefault();

  const serializedTweet = $(this).serialize();

  $.post('/tweets', serializedTweet)
    .then((response) => {
      console.log(response);
      loadtweets();
    })
  })



const renderTweets = function(tweets) {
  const $tweets = $(`#tweets-container`)
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let id of tweets) {
    const tweet = id
    $tweets.append(createTweetElement(tweet));
  
  }
}


const createTweetElement = function(tweet) {
  let $tweet = $(`
  <article class="tweet">
    <header>
      <div class="user" class="avatar-name">
        <img class="avatar" src=${tweet.user.avatars}"> 
        <h3 class="tweet-firstname">${tweet.user.name}</h3>
     </div>
     <h3 class="lighter-username">${tweet.user.handle}</h3>
    </header> 
    <p>
    ${tweet.content.text}
    </p>
    <footer>
      <div>${tweet.created_at}</div>
      <div> &#x2691; &#x2665; <i class="fa">&#xf079;</i></div>
    </footer>
  </article>`)

return $tweet;
}

})



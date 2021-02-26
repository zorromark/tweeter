/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {



const $alert1 = $('.alert1');
$alert1.hide();

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
 
  $textarea = $('#tweet-text').val().trim();
  $textLength = $textarea.length;
    

  if ($textarea === "" || $textarea === null) {
    
    $alert1.addClass('showAlert1').text('Empty tweets will not change the world, please type something.')
    $alert1.slideDown('slow')
    

    
  } else if ($textLength > 140) {
    $alert1.addClass('showAlert1').text('Too much goodness, please shorten your tweet to less than 140 characters.')
    $alert1.slideDown('slow')
   
  

  } else {
    $alert1.slideUp('slow')

  $.post('/tweets', serializedTweet)
    .then((response) => {
      console.log(response);
      loadtweets();
    })
  }
})


const renderTweets = function(tweets) {
  const $tweets = $(`#tweets-container`)
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let id of tweets) {
    const tweet = id
    $tweets.prepend(createTweetElement(tweet));
  
  }
}

const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



const createTweetElement = function(tweet) {
  const date = moment(tweet.created_at).fromNow()
  const now = moment(Date.now())
  
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="user" class="avatar-name">
        <img class="avatar" src=${tweet.user.avatars}"> 
        <h3 class="tweet-firstname">${tweet.user.name}</h3>
     </div>
     <h3 class="lighter-username">${tweet.user.handle}</h3>
    </header> 
    <p>
    ${escape(tweet.content.text)}
    </p>
    <footer>
      <div>${date}</div>
      <div> &#x2691; &#x2665; <i class="fa">&#xf079;</i></div>
    </footer>
  </article>`)

return $tweet;
}

})



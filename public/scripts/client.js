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
  };

  loadtweets();

  // Process flow of when tweet button is clicked. 

  const $tweetButton = $('.tweet-form');

  $tweetButton.on('submit', function(event) {
    event.preventDefault();

    const serializedTweet = $(this).serialize();
 
    $textarea = $('#tweet-text').val().trim();
    $textLength = $textarea.length;
    
    // Validation to ensure tweet not empty and doesn't go over limit.

    if ($textarea === "" || $textarea === null) {
    
      $alert1.addClass('showAlert1').text('Empty tweets will not change the world, please type something.');
      $alert1.slideDown('slow');
    
    } else if ($textLength > 140) {
      $alert1.addClass('showAlert1').text('Too much goodness, please shorten your tweet to less than 140 characters.');
      $alert1.slideDown('slow');
   
    } else {
      $alert1.slideUp('fast');

    // If validation passes post tweet with AJAX.

    $.post('/tweets', serializedTweet)
      .then((response) => {
        console.log(response);
        loadtweets();
    
    // After posting also clear form area and reset counter. 

      $('.tweet-form').trigger("reset");
      $('.counter').text(140);
      })
    }
  });


  const renderTweets = function(tweets) {
  const $tweets = $(`#tweets-container`);

    for (let id of tweets) {
      const tweet = id;
      $tweets.prepend(createTweetElement(tweet));
    }
  };

  //Preventing XSS with escaping.

  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
  };

});



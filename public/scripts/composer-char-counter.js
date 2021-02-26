$(document).ready(function() {
  
  const $ta = $('#tweet-text');

  $ta.on('input', function() {
    // console.log('this', this);
    const remainingTweetRoom = 140 - $(this).val().length;
    const counterNewTweet = $(this).parent().find('.counter');
    counterNewTweet.text(remainingTweetRoom);
    if (remainingTweetRoom < 0) {
      counterNewTweet.addClass('red');
    } else {
      counterNewTweet.removeClass('red');
    }
  })
});
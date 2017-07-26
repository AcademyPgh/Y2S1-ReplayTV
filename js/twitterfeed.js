var currentTweet = 0;
var totalTweets  = 0;

function hideTweets() {
  $("#tweet-" + currentTweet).css({opacity:1}).animate({opacity:0}, 1000);
  var rotationTimer = setTimeout(tweetRotation, 500);
}

function tweetRotation() {
  currentTweet = 0 ? hideTweets() : currentTweet += 1;
  $("#tweet-" + currentTweet).css({opacity:0}).animate({opacity:1}, 1000);
  var hideTimer = setTimeout(hideTweets, tweetRotationIntervalInMS);
  if (currentTweet >= totalTweets){
    clearTimeout(hideTimer);
    loadTweets();
  }
}

$(document).ready(function(){
  loadTweets();
});

function loadTweets(){
$.ajax({
  type: "GET",
  url: mongoURL,
  contentType: "application/json",
  data: {
    // Query string data from the url goes here (the part after the question mark ? in a url)
    "apiKey": mongoKEY
  },
  success: function(tweet_data) {
    totalTweets = tweet_data.length;
    jQuery('#socialFeed').html('');
    currentTweet = 0;
    for(i = 0; i < totalTweets; i++){
      $('#socialFeed').append('<div class="tweet" id="tweet-' +i+ '" style="opacity:0"><div class="tweet-container">'
      +'<div class="row">'
        +'<div class="col-sm-12">'
          +'<div class="section">'
            +'<div class="section_content">'
        +'<div class="tweet-container2">'
        +'<div class="row green">'
          +'<div class="col-sm-10">'
            +'<div class="row.small">'
          +'<p class="handle">@' +tweet_data[i].userName+ '</p>'
        +'</div>'
          +'</div>'
          +'<div class="col-sm-2">'
            +'<img class="tlogo" src="twitter.png">'
          +'</div>'
        +'</div>'
        +'<div class="row">'
          +'<div class="col-sm-12 green tweet-img" id="pic_'+ tweet_data[i]._id.$oid +'">'
          +'</div>'
        +'</div>'
        +'<div class="row blue">'
          +'<div class="col-sm-12">'
            +'<div class="twext"><p class="twext">'+tweet_data[i].tweetText+'</p></div>'
          +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div></div></div></div>');

        var imageToLoad = tweet_data[i].tweetImage;
        var remoteImage = new RAL.RemoteImage({src: imageToLoad, width: "100%", height: "250px"});
        $("#pic_" + tweet_data[i]._id.$oid).append(remoteImage.element);
        RAL.Queue.add(remoteImage);
    }
    RAL.Queue.setMaxConnections(4);
    RAL.Queue.start();

    setTimeout(tweetRotation, 1000);
  },
  error: function(request, errorType, errorMessage) {
    console.log("ERROR: " + errorMessage);
  }
})};

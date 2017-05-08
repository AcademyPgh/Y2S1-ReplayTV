/**
 * How to use TwitterFetcher's fetch function:
 *
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 *
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 *
 * You may specify at minimum the following required properties:
 *
 * @param object.id {string} DEPRECATED due to Twitter Change. Only use if
 *     you have an ID from prior to change. The ID of the Twitter widget you
 *     wish to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 *
 * Along with at least one of these:
 *
 * @param object.profile {Object} An object containing a refernece to the
 *     screen name we wish to grab tweets for. Should be like this:
 *     {"screenName": 'jason_mayes'}
 *
 * @param object.likes {Object} An object containing a refernece to the
 *     screen name we wish to grab likes for. Should be like this:
 *     {"screenName": 'jason_mayes'}
 *
 * @param object.list {Object} An object containing a refernece to the
 *     screen name we wish to grab list for. Should be like this:
 *     {"listSlug": 'inspiration', "screenName": 'jason_mayes'}
 *
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.linksInNewWindow [boolean] Set false if you don't want links
 *     to open in new window.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 * @param object.showPermalinks [boolean] Set false if you don't want time
 *     to be permalinked.
 * @param object.dataOnly [boolean] Set true if you want the argument passed
 *     to the customCallback to be an Array of Objects containing data
 *     instead of an Array of HTML Strings
 */


// ##### Advanced example 3 #####
// An advance example to get data in Objects, instead of HTML Strings,
// to populate a template for example.

var socialFeed = {
  "id": '860235084905021443',
  "dataOnly": true,
  "maxTweets": 20,
  "showImages": true,
  "customCallback": populateTpl,
};

twitterFetcher.fetch(socialFeed);

function populateTpl(tweets){
  var element = document.getElementById('socialFeed');
  var html = '<div class="tweet-container">';
  for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
    var tweetObject = tweets[i];
//only continue if the object contains an image.
    if(!tweetObject.image){
      continue;
    }
    var avatar = $(tweetObject.author).find('img').attr('src');
    var uName = $(tweetObject.author).find('.TweetAuthor-name').attr('title');
    var screenName = $(tweetObject.author).find('.TweetAuthor-screenName').attr('title');
    console.log(tweetObject.tweet);
    //added Jquery to split up authors into individual profile pic, name, and username.
    //avatar: $(author[n]).find('img').attr('src');
  //  uName: $(author[n]).find('.TweetAuthor-name').attr('title');
  //  screenName: $(author[n]).find('.TweetAuthor-screenName').attr('title');












    html += '<div class="row">'
      +'<div class="col-sm-12">'
        +'<div class="section">'
          +'<div class="corner tl">'
            +'<div class="a"></div>'
            +'<div class="b"></div>'
            +'<div class="c"></div>'
          +'</div>'
          +'<div class="corner tr">'
            +'<div class="a"></div>'
            +'<div class="b"></div>'
            +'<div class="c"></div>'
          +'</div>'
          +'<div class="section_content">'
      +'<div class="tweet-container2">'
      +'<div class="row green">'
        +'<div class="col-sm-10">'
          +'<div class="row.small">'
        +'<p class="handle">' + screenName + '</p>'
      +'</div>'
        +'</div>'
        +'<div class="col-sm-2">'
          +'<img class="tlogo" src="http://i.imgur.com/YwHzSGv.png">'
        +'</div>'
      +'</div>'
      +'<div class="row green">'
        +'<div class="col-sm-12 blue">'
        +(tweetObject.image ? '<img class="tweet-img" src="'+tweetObject.image+'" />' : '<img class="tweet-img" src=" ">')
        +'</div>'
      +'</div>'
      +'<div class="row blue">'
        +'<div class="col-sm-12">'
          +'<div class="twext"><p class="twext">'+tweetObject.tweet+'</p></div>'
        +'</div>'
      +'</div>'
      +'</div>'
            +'<div class="corner bl">'
              +'<div class="a"></div>'
              +'<div class="c"></div>'
              +'<div class="b"></div>'
            +'</div>'
            +'<div class="corner br">'
              +'<div class="a"></div>'
              +'<div class="c"></div>'
              +'<div class="b"></div>'
            +'</div>'
            +'</div>'
      +'</div>'
      +'</div></div>'

  }
  html += '</div>';
  element.innerHTML = html;
}

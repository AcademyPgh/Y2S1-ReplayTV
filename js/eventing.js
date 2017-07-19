// This file is for the functions needed to run an eventing service, allowing events to be set up ahead of times

// Event types:
// - Full Screen Announcements
// - Change video


function bigNews(message) {
  $('#announcement').html(message);
  $('#overlay').hide().delay(1000).fadeIn(1000).delay(1000).fadeOut(1000);
  $('#announcement').hide().delay(1000).fadeIn(1000).delay(1000).fadeOut(1000);
}
$(document).ready(function(){
  $('.backgroundImage').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 500,
    fade: true,
    arrows: false,
    // cssEase: 'linear'
  });
  bigNews("I smell pizza.");
});

function showVideo(link){
  var video = document.getElementById("flick");
  video.src = link;
  video.load();
}

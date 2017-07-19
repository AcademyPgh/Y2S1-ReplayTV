// This file is for the functions needed to run an eventing service, allowing events to be set up ahead of times

// Event types:
// - Full Screen Announcements
// - Change video


function showAnnouncement(message) {
  $('#announcement').html(message);
  $('#overlay').hide().delay(1000).fadeIn(1000).delay(1000).fadeOut(1000);
  $('#announcement').hide().delay(1000).fadeIn(1000).delay(1000).fadeOut(1000);
}

function showVideo(link){
  var video = document.getElementById("flick");
  video.src = link;
  video.load();
}

function checkEvents() {
  // go over the list of events in memory, see if they should run
  console.log('checking events');
  now = new Date();
  curr_events.map((item) => {
    event_time = Date.parse(item.time);
    if (item.enabled)
    {
      if (event_time + 120000 < now) // well passed the time it should've played
      {
        item.enabled = false;
      }
      if (event_time < now && item.enabled) // if we are at least slightly beyond the event time
      {
        item.enabled = false;
        switch (item.type)
        {
          case 'announcement': showAnnouncement(item.value);
          case 'video': showVideo(item.value);
        }
      }
    }

  });
}

function fetchEvents() {
  // request new events and add them to the curr_events array

  $.getJSON('/test_schedule.json', (data) => {
    // all of the work once the json is here
    data.map(item)
    {

    }
  });

}

curr_events = [{
  id: 1,
  type: 'announcement',
  value: 'Hello there humans!',
  time: '7/19/17 15:57',
  enabled: true
},
{
  id: 2,
  type: 'announcement',
  value: 'Hello there non-humans!',
  time: '7/19/17 16:15',
  enabled: true
},
{
  id: 3,
  type: 'video',
  value: 'http://192.168.1.121:1234/2016-11-05%2013-10-27.mp4',
  time: '7/19/17 16:18',
  enabled: true
},
{
  id: 34,
  type: 'video',
  value: 'http://192.168.1.121:1234/2016-11-05%2013-14-39.mp4',
  time: '7/19/17 16:20',
  enabled: true
}]

$(() => {
  setInterval(checkEvents, 5000);
});

$(() => {
  showAnnouncement("online!");
});

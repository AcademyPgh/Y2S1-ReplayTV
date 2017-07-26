// This file is for the functions needed to run an eventing service, allowing events to be set up ahead of times

// Event types:
// - Full Screen Announcements
// - Change video

function showAnnouncement(message) {
  $('#announcement').html(message);
  $('#overlay').hide().
    fadeIn(announcementFadeInOutTimeInMS).
    delay(displayAnnouncementThisManyMS).
    fadeOut(announcementFadeInOutTimeInMS);
  $('#announcement').hide().
    fadeIn(announcementFadeInOutTimeInMS).
    delay(displayAnnouncementThisManyMS).
    fadeOut(announcementFadeInOutTimeInMS);
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
      if (event_time + tooFarPastScheduleTime < now) // well past the time it should've played
      {
        console.log('found too old event: ', item);
        item.enabled = false;
      }
      if (event_time < now && item.enabled) // if we are at least slightly beyond the event time
      {
        item.enabled = false;
        switch (item.type)
        {
          case 'announcement':
            showAnnouncement(item.value);
            break;
          case 'video':
            showVideo(item.value);
            break;
          default:
            console.log("Invalid event type: ", item);
        }
      }
    }

  });
}

function fetchEvents() {
  // request new events and add them to the curr_events array

  $.getJSON(eventScheduleURL + new Date(), (data) => {
    // all of the work once the json is here
    console.log(data);
    data.map((item) =>
    {
      original = _.find(curr_events, {id: item.id});

      if (!original)
      {
        curr_events.push(item);
      }
      else
      {
        original.value = item.value;
        original.type = item.type;
        if (original.time != item.time)
        {
          original.enabled = item.enabled;
          original.time = item.time;
        }
      }
    });
  });

}

curr_events = []

$(() => {
  setInterval(checkEvents, checkEventsIntervalInMS);
  setInterval(fetchEvents, fetchEventsIntervalInMS);
  setTimeout(() => { location.reload(); }, appReloadIntervalInMS);
});

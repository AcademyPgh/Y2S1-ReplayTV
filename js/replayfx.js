function getTodaysSchedule() {
  var itemHidden = $(".itemHidden");
  itemHidden.each(function() {
    $(this).removeClass("itemHidden");
    $(this).addClass("item");
  });

  var baseurl = replayScheduleURL;

  //clear html of all elements
  $(".happening").html("<h3>Now Happening</h3>");
  $(".featured").html("<h3>Featured Events</h3>");
  $(".announcement").html("<h3>Announcements</h3>");
  $(".list").html();

  var compareDte = new Date();
  var startDte = new Date(2017,7,27);
  var endDte = new Date(2017,7,30);
  var dte = new Date();
  if(startDte<=compareDte&&compareDte<=endDte)
  {
    dte = dte.getMonth()+"-"+dte.getDate()+"-"+dte.getFullYear();
  }
  else {
    dte = "7-27-17";
  }

  var numUpcomingEvents = 0;
  var announcementExists = false;
  $.ajax({
    url: baseurl+"daily/"+dte,
    context: document.body,
  }).done(function(data) {
    var html = "";
    var counter = 0;
    var upcoming = $("<div></div>");
    upcoming.appendTo("body");
    $(data).each(function(){
      var evnt = $("<div></div>");
      var title = $("<h2></h2>");
      var times = $("<div></div>");
      var startTime = $("<span></span>");
      var description = $("<div></div>");
      var eventType = this["replayEventTypes"];
      var image = this["image"];
      var location = $("<div></div>");

      //Pull Data from each object
      title.html(this["title"]);
      var tempStartTime = this["startTime"];
      if(tempStartTime!==null&&tempStartTime.substring(0,2)>12) {
        var hour = tempStartTime.substring(0,2);
        hour= hour-12;
        tempStartTime = hour+":"+tempStartTime.substring(3,5)+" pm ";
      }
      else if(tempStartTime!==null) {
        if(tempStartTime.substring(0,2)=="00") {
          tempStartTime = "12:00 am ";
        }
        else {
          tempStartTime = tempStartTime+" am ";
        }
      }
      else {
        tempStartTime = "";
      }

      var tempEndTime = this["endTime"];
      if(tempEndTime!==null&&tempEndTime.substring(0,2)>12) {
        var hour = tempEndTime.substring(0,2);
        hour= hour-12;
        tempEndTime = hour+":"+tempEndTime.substring(3,5)+" pm ";
      }
      else if(tempEndTime!==null) {
        if(tempEndTime.substring(0,2)=="00") {
          tempEndTime = "12:00 am ";
        }
        else {
          tempEndTime = tempEndTime+" am ";
        }
      }
      else {
        tempEndTime = "";
      }

      startTime.html(tempStartTime+" - " +tempEndTime);
      description.html(this["description"]);
      //append and format times
      startTime.appendTo(times);

      location.html("Locations: " + this["location"]);
      title.appendTo(evnt);
      times.appendTo(evnt);
      description.appendTo(evnt);
      location.appendTo(evnt);
      evnt.addClass("event")
      counter++;
      var tem = $("<div></div>");
      tem.addClass("smallEvent");

      var curDay = new Date();
      var hasStarted = true;
      if(!(this["startTime"].substring(0,2)<curDay.getHours())) {
        if((this["startTime"].substring(0,2) > curDay.getHours()) ||
           (this["startTime"].substring(0,2) == curDay.getHours() &&
           this["startTime"].substring(3,5)>curDay.getMinutes())) {
          title.clone().appendTo(tem);
          startTime.clone().appendTo(tem);
          location.clone().appendTo(tem);
          $("<br />").appendTo(tem);
          tem.appendTo(".list");
          numUpcomingEvents++;
          hasStarted = false;
        }
      }

      //This block of code will add the events to the Now Happening if they are currently happening.
      if(hasStarted) {
        if(this["endTime"]==null ||
          (this["endTime"].substring(0,2) > curDay.getHours()) || 
          (this["endTime"].substring(0,2) == curDay.getHours() && 
           this["endTime"].substring(3,5) > curDay.getMinutes())) {
          addEventToSliderElement(evnt,"happening");
        }
      }

      var featured = isOfType(eventType, "featured");
      if(featured) {
        addEventToSliderElement(evnt,"featured");
      }

      var announcement = isOfType(eventType,"announcement");
      if(announcement) {
        addEventToSliderElement(evnt,"announcement");
      }
      if(image!=null) {
        addEventToSliderElement(evnt,"announcement");
      }
    });
    var items = $(".mainSection");

    $(items).each(function(){
      if($(this).find(".event").length==0)
      {
        $(this).removeClass("item");
        $(this).addClass("itemHidden");
      }
    });
  });
}

function isOfType (event, type) {
  var temp = false;
  $(event).each(function(){
    if(this["name"]==type)
    {
      temp = true;
    }
  });
  return temp;
}

function addEventToSliderElement(event, element) {
  var counting = 0;
  var evntClone = event.clone();
  element = "."+element;
  $(element).each(function(){
  if($(this).find(".event").length>=2)
  {
    if(counting==$(element).length-1)
    {
          var tempEvent = $(this).clone().html("");
          var tempItemDiv = $("<div></div>");
          tempItemDiv.addClass("item");

          evntClone.appendTo(tempEvent);
          tempEvent.appendTo(tempItemDiv);
          tempItemDiv.insertAfter($(this).parents(".item"));
    }
    else {
     evntClone.appendTo(this);
    }
  }
  else
  {
    evntClone.appendTo(this);
  }
  counting++;
});
}

// all items that must happen on load should be put into this function
function init() {
  $("#close_me").on("click", () => {window.close();});
  $('.backgroundImage').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: bgChangeIntervalInMS,
      fade: true,
      arrows: false,
      // cssEase: 'linear'
    });

  getTodaysSchedule();
  setInterval(function(){
    getTodaysSchedule();
  }, 600000);
}

$(init);

$(function () {
  $('.marquee').marquee({
    duration: '9000',
    gap: '800',
    direction: 'up',
    duplicated: true
  });
})

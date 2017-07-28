// these are constants to control behavior in the application. Include this file and declare consts here; humans will edit it to make stuff change how it behaves.

// eventing constants
const tooFarPastScheduleTime        = 120000; // 2 minutes
const eventScheduleURL              = 'http://replaytvnotifications.azurewebsites.net/notifications/all?';
const checkEventsIntervalInMS       = 5000;
const fetchEventsIntervalInMS       = 10000;
const displayAnnouncementThisManyMS = 15000;
const announcementFadeInOutTimeInMS = 1000;

// twitter
const mongoURL                  = "https://api.mongolab.com/api/1/databases/replaytweets/collections/fxtweets";
const mongoKEY                  = "GNTzkTa9ucksY89SsIgyW3rN0mdfc1AH";
const tweetRotationIntervalInMS = 15000;

// other
const appReloadIntervalInMS = 1800000; // 30 mins
const replayScheduleURL     = "http://replayfxcalendar.azurewebsites.net/";
const bgChangeIntervalInMS  = 30000;

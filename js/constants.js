// these are constants to control behavior in the application. Include this file and declare consts here; humans will edit it to make stuff change how it behaves.

// eventing constants
const tooFarPastScheduleTime        = 120000;
const eventScheduleURL              = '/test_schedule.json?';
const checkEventsIntervalInMS       = 5000;
const fetchEventsIntervalInMS       = 10000;
const displayAnnouncementThisManyMS = 3000;
const announcementFadeInOutTimeInMS = 1000;

// twitter
const mongoURL                  = "https://api.mongolab.com/api/1/databases/replaytweets/collections/fxtweets";
const mongoKEY                  = "GNTzkTa9ucksY89SsIgyW3rN0mdfc1AH";
const tweetRotationIntervalInMS = 4500;

// other
const appReloadIntervalInMS = 300000;
const replayScheduleURL     = "http://replayfxcalendar.azurewebsites.net/";
const bgChangeIntervalInMS  = 5000;
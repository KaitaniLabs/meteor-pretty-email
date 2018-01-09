Package.describe({
  name: "allerion:meteor-pretty-email",
  summary: "Send pretty emails",
  version: "0.1.1",
  git: "https://github.com/KaitaniLabs/meteor-pretty-email.git"
});

Package.onUse(function(api) {
  
  api.versionsFrom('METEOR@1.0');

  api.use('email');
  api.use('underscore');
  api.use([
    'accounts-base',
    'accounts-password'
  ], { weak: true });
  api.use('cmather:handlebars-server@2.0.0');

  api.addFiles([
    'server/init.js',
    'server/templates/shared/footer.handlebars',
    'server/templates/shared/followBlock.handlebars',
    'server/templates/shared/preheader.handlebars',
    'server/templates/shared/logoBlock.handlebars',
    'server/templates/call-to-action.handlebars',
    'server/templates/basic.handlebars',
    'server/templates/alert.handlebars'
  ],'server');

  api.addAssets([
    'client/images/barchart.png',
    'client/images/brightness.png',
    'client/images/browser.png',
    'client/images/calendar.png',
    'client/images/caution.png',
    'client/images/chat.png',
    'client/images/check.png',
    'client/images/clock.png',
    'client/images/cloud.png',
    'client/images/compose.png',
    'client/images/computer.png',
    'client/images/creditcard.png',
    'client/images/crossroads.png',
    'client/images/denied.png',
    'client/images/download.png',
    'client/images/email.png',
    'client/images/gear.png',
    'client/images/heart.png',
    'client/images/key.png',
    'client/images/location.png',
    'client/images/locked.png',
    'client/images/magnifyingglass.png',
    'client/images/mail.png',
    'client/images/map.png',
    'client/images/mic.png',
    'client/images/microphone.png',
    'client/images/money.png',
    'client/images/music.png',
    'client/images/news.png',
    'client/images/pencil.png',
    'client/images/phone.png',
    'client/images/photo.png',
    'client/images/piechart.png',
    'client/images/play.png',
    'client/images/power.png',
    'client/images/present.png',
    'client/images/profile.png',
    'client/images/ribbon.png',
    'client/images/security.png',
    'client/images/settings.png',
    'client/images/shoeprints.png',
    'client/images/smartphone.png',
    'client/images/speaker.png',
    'client/images/stack.png',
    'client/images/star.png',
    'client/images/stop.png',
    'client/images/support.png',
    'client/images/swatches.png',
    'client/images/tablet.png',
    'client/images/target.png',
    'client/images/tools.png',
    'client/images/trends.png',
    'client/images/trophy.png',
    'client/images/typography.png',
    'client/images/unlocked.png',
    'client/images/upload.png',
    'client/images/video.png',
    'client/images/volume.png',
    'client/images/windy.png',
    'client/images/zoomin.png',
    'client/images/zoomout.png'
  ],'client');

  api.export('PrettyEmail', 'server');

});

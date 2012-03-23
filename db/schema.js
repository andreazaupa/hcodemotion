define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Page = describe('Page', function () {
    property('title', String);
    property('body', String);
    property('author', String);
});var Tweet = describe('Tweet', function () {
    property('message', String);
    property('author', String);
});
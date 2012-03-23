require('../test_helper.js').controller('tweets', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        message: '',
        author: ''
    };
}

exports['tweets controller'] = {

    'GET new': function (test) {
        test.get('/tweets/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/tweets', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Tweet.find;
        Tweet.find = sinon.spy(function (id, callback) {
            callback(null, new Tweet);
        });
        test.get('/tweets/42/edit', function () {
            test.ok(Tweet.find.calledWith('42'));
            Tweet.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Tweet.find;
        Tweet.find = sinon.spy(function (id, callback) {
            callback(null, new Tweet);
        });
        test.get('/tweets/42', function (req, res) {
            test.ok(Tweet.find.calledWith('42'));
            Tweet.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var tweet = new ValidAttributes;
        var create = Tweet.create;
        Tweet.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, tweet);
            callback(null, tweet);
        });
        test.post('/tweets', {Tweet: tweet}, function () {
            test.redirect('/tweets');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var tweet = new ValidAttributes;
        var create = Tweet.create;
        Tweet.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, tweet);
            callback(new Error, null);
        });
        test.post('/tweets', {Tweet: tweet}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Tweet.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/tweets/1', new ValidAttributes, function () {
            test.redirect('/tweets/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Tweet.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/tweets/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};


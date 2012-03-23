require('../test_helper.js').controller('pages', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        body: '',
        author: ''
    };
}

exports['pages controller'] = {

    'GET new': function (test) {
        test.get('/pages/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/pages', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Page.find;
        Page.find = sinon.spy(function (id, callback) {
            callback(null, new Page);
        });
        test.get('/pages/42/edit', function () {
            test.ok(Page.find.calledWith('42'));
            Page.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Page.find;
        Page.find = sinon.spy(function (id, callback) {
            callback(null, new Page);
        });
        test.get('/pages/42', function (req, res) {
            test.ok(Page.find.calledWith('42'));
            Page.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var page = new ValidAttributes;
        var create = Page.create;
        Page.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, page);
            callback(null, page);
        });
        test.post('/pages', {Page: page}, function () {
            test.redirect('/pages');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var page = new ValidAttributes;
        var create = Page.create;
        Page.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, page);
            callback(new Error, null);
        });
        test.post('/pages', {Page: page}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Page.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/pages/1', new ValidAttributes, function () {
            test.redirect('/pages/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Page.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/pages/1', new ValidAttributes, function () {
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


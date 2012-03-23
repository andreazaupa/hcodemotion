load('application');

before(loadTweet, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New tweet';
    this.tweet = new Tweet;
    render();
});

action(function create() {
    Tweet.create(req.body.Tweet, function (err, tweet) {
        if (err) {
            flash('error', 'Tweet can not be created');
            render('new', {
                tweet: tweet,
                title: 'New tweet'
            });
        } else {
            flash('info', 'Tweet created');
            redirect(path_to.tweets);
        }
    });
});

action(function index() {
    this.title = 'Tweets index';
    Tweet.all(function (err, tweets) {
        render({
            tweets: tweets
        });
    });
});

action(function show() {
    this.title = 'Tweet show';
    render();
});

action(function edit() {
    this.title = 'Tweet edit';
    render();
});

action(function update() {
    this.tweet.updateAttributes(body.Tweet, function (err) {
        if (!err) {
            flash('info', 'Tweet updated');
            redirect(path_to.tweet(this.tweet));
        } else {
            flash('error', 'Tweet can not be updated');
            this.title = 'Edit tweet details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.tweet.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy tweet');
        } else {
            flash('info', 'Tweet successfully removed');
        }
        send("'" + path_to.tweets + "'");
    });
});

function loadTweet() {
    Tweet.find(params.id, function (err, tweet) {
        if (err) {
            redirect(path_to.tweets);
        } else {
            this.tweet = tweet;
            next();
        }
    }.bind(this));
}

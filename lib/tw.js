var my_user="azaupa";
var my_password="con...";
var TwitterNode = require('twitter-node').TwitterNode, sys = require('sys');
var twit = new TwitterNode({  user: 'azaupa', password: my_password,  track: ['codemotion']});

twit.addListener('error', function(error) {
  console.log(error.message);
});

twit
	.addListener('tweet', function(tweet) {
    sys.puts("@" + tweet.user.screen_name + ": " + tweet.text);
  }).addListener('limit', function(limit) {
    sys.puts("LIMIT: " + sys.inspect(limit));
  }).addListener('delete', function(del) {
    sys.puts("DELETE: " + sys.inspect(del));
  }).addListener('end', function(resp) {
    sys.puts("wave goodbye... " + resp.statusCode);
  }).stream();
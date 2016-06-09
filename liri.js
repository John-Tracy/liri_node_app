var keys = require('./keys.js');
var Twitter = require('twitter');
var userCommand = process.argv[2];

// console.log(keys.twitterKeys.consumer_key);

var tweetFunction = function(){

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {
	screen_name: 'johntracy728'
};

client.get('statuses/user_timeline', params, function(error, tweets, response){

	if(tweets.length < 20){
		for(var i = 0; i < tweets.length; i++){

		console.log('==========================');
		console.log(tweets[i].text);
		console.log('==========================');

		}
	}
	else{
		for(var i = 0; i < 20; i++){
			console.log('==========================');
			console.log(tweets[i].text);
			console.log('==========================');
		}
	}
	});
};

var song = function(){

var spotify = require('spotify');
 
spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
    		console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);

});

};

var movie = function(){



};

if(userCommand == 'my-tweets'){
	tweetFunction();
}
else if(userCommand == 'spotify-this-song'){
	song();
}
else if(userCommand == 'movie-this'){
	movie();
}


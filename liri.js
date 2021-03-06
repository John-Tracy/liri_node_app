fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var userCommand = process.argv[2];

var stringy = function(){   // invoked in case of multiple word user inputs
							// turns all the words into one usable string
	var holder = [];
	for(var i = 3; i < process.argv.length; i++){
		holder.push(process.argv[i]);
	}
	return holder.join(' ');

};

var dataLog = function(){        // logs all user inputs into log text file
	var command = process.argv[2];
	var userParam;
	var holder = []; 
	if(process.argv.length == 4){
		userParam = process.argv[3];
	}
	else if(process.argv.length > 4){
		
		userParam = stringy();
	}
	
	var strComp = command + ',' + userParam + ';';

	fs.appendFile('log.txt', strComp, 'utf8', function(err){});

};

var tweetFunction = function(){ // uses twitter npm to utilize API to grab tweets

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

var song = function(){		// uses spotify npm package to utilize api to get requested song info for user.

var songName = process.argv[3];
var strArray = [];

if(process.argv.length > 4){

	songName = stringy();

}
else if(songName == undefined){			// in the case the user didnt give a song name
	songName = "what's my age again";
}

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 			
 			console.log('==========Artist==========');
    		console.log(data.tracks.items[0].artists[0].name);
    		console.log('==========Track==========');
            console.log(data.tracks.items[0].name);
            console.log('==========Preview URL==========');
            console.log(data.tracks.items[0].preview_url);
            console.log('==========Album==========');
            console.log(data.tracks.items[0].album.name);

});

};

var movie = function(){		// uses request npm to use omdb api to get user requested movie info
	var input;
	var strArray = [];
	if(process.argv.length > 4){

		input = stringy();
	}
	else if(process.argv.length == 4){
		input = process.argv[3];
	}
	else if(process.argv[3] == undefined){ // in the case that the user didnt give a user name
		input = 'Mr. Nobody';
	}

	var url = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json&tomatoes=true';

	request(url, function(err, response, body){

		body = JSON.parse(body);
		console.log('===========Title===========');
		console.log(body.Title);
		console.log('===========Year===========');
		console.log(body.Year);
		console.log('===========IMDB Rating===========');
		console.log(body.imdbRating);
		console.log('===========Country===========');
		console.log(body.Country);
		console.log('===========Language===========');
		console.log(body.Language);
		console.log('===========Plot===========');
		console.log(body.Plot);
		console.log('===========Actors===========');
		console.log(body.Actors);
		console.log('===========Rotten Tomatoes Rating===========');
		console.log(body.tomatoRating);
		console.log('===========Rotten Tomatoes URL===========');
		console.log(body.tomatoURL);

	});

};

var doIt = function(){  // does this from info in random text file.
	fs.readFile('random.txt', 'utf8', function(err, data){ // reads file to grab info to be used.
		if(err){
			console.log('ERROR: ' + err);
		}
		else{	// parses data to be used to make a command and execute.
			var splitArray = data.split(',');
			userCommand = splitArray[0];
			process.argv[3] = splitArray[1];

			direction();
		}
	});
};

var direction = function(){
								// validates which command the user made then executes the corresponding function
	if(userCommand == 'my-tweets'){
		tweetFunction();
	}
	else if(userCommand == 'spotify-this-song'){
		song();
	}
	else if(userCommand == 'movie-this'){
		movie();
	}
	else if(userCommand == 'do-what-it-says'){
		doIt()
	}

};

dataLog();
direction();

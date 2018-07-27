require("dotenv").config();

// Import the Twitter NPM package.
var Twitter = require("twitter");
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");
// Import the request npm package.
var request = require("request");
// Import the FS package for read/write.
var fs = require("fs");
// Initialize the spotify API client using our client id and secret
var spotifyKey = new Spotify(keys.spotify);

var userCommand = process.argv[2];

// Spotify
var searchTerm = process.argv[3];

function getSpotify(){
	
	console.log("Search: ", searchTerm);
  //searches for "The Sign by Ace of Base" if no search term was entered
	if (searchTerm ===  undefined || searchTerm ==="") {
	    searchTerm = 'The Sign Ace of Base'
	}; 

	spotifyKey.search({ type: 'track', query: searchTerm }, function (err, data) {
	if (err) {
	  console.log(err)
	} else {

	// console.log(data);
	for (var i = 0; i<data.tracks.items[0].artists.length; i++){
    	console.log("Artist: " + data.tracks.items[0].artists[i].name);
 	}
	console.log("Song Name: " + data.tracks.items[0].name);
 	console.log("Preview: " + data.tracks.items[0].preview_url);
   	console.log("Album Name: " + (data.tracks.items[0].album.name));
  }
  
  });
  
};
getSpotify();
// End of spotify



// Twitter
function getTweets() {
	var params = {screen_name: 'encelphiro', count: 20, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
					//console.log(tweets);
					tweetsArray = tweets;

					for(i=0; i<tweetsArray.length; i++){
						console.log("Created at: " + tweetsArray[i].created_at);
						console.log("Text: " + tweetsArray[i].text);
						console.log('--------------------------------------');
					}
				}
				else{
					console.log(error);
				}
	});
};
getTweets();
// var client = new Twitter(keys.twitter);
// console.log(client)


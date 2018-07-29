require("dotenv").config();

// Import the Twitter NPM package.
var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
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
var searchTerm = process.argv[3];


//----------- Spotify------------------

function getSpotify(){
	
	console.log("Search: ", searchTerm);
  

	spotifyKey.search({ type: 'track', query: searchTerm }, function (err, data) {
	if (err) {
	  console.log(err)
	} else {
	for (var i = 0; i<data.tracks.items[0].artists.length; i++){
    	console.log("Artist: " + data.tracks.items[0].artists[i].name);
 	}
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Preview: " + data.tracks.items[0].preview_url);
		console.log("Album Name: " + (data.tracks.items[0].album.name));
  }
  
  });
  
};

// ---------End of spotify--------------



// -------------Twitter-----------------
function getTweets() {
	var params = {screen_name: 'encelphiro', count: 20, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
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
// --------End twitter area-------------

// -------Begin movie area------------

function getMovie() {
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";
// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
if (userCommand === 'movie-this' && nodeArgs[3] === undefined) {
	movieName = "Mr. Nobody"
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName + "&tomatoes=true&y=&plot=short&r=json";
console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {
// put json.parse into a var, make code more readable
var movieData = JSON.parse(body)

    console.log("Movie Name: " + movieData.Title);
    console.log("Released: " + movieData.Year);
	console.log("IMDB Rating: " + movieData.imdbRating);
	console.log("Tomato Meter: " + movieData.tomatoRating);
	console.log("Origin: " + movieData.Country);
    console.log("Language: " + movieData.Language);
    console.log("Plot: " + movieData.Plot);
    console.log("Actors: " + movieData.Actors);
  }
});
};
// getMovie();

// Begin selection area
function selectCommand() {

  fs.readFile("random.txt", "utf8", function(error, data) {
  
	var output = data.split(",");
  
	userCommand = output[0];
	searchTerm = output[1];
	  if (userCommand === 'spotify-this-song'){
		getSpotify();
	  }
  });
  
  }
  

  // //If there is no song, return wake the dead
  if (userCommand === 'spotify-this-song' && process.argv[3] === undefined){
	searchTerm = 'wake the dead';
  }
  
  
  if (userCommand === 'my-tweets') {
	  getTweets();
  }
  
  
  
  if (userCommand === 'spotify-this-song') {
	  getSpotify();
  }
  
  
  
  if (userCommand === 'movie-this') {
	  getMovie();
  }
  
  
  if (userCommand === 'do-what-it-says') { 
	  selectCommand();
  }
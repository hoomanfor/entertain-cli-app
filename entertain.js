require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
// console.log(command);
// console.log(query);

console.log("")
switch (command) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + process.env.APP_ID).then(function(response) {
            // console.log(response.data[0].venue.name);
            // console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
            // console.log(moment((response.data[0].datetime)).format("MM/DD/YYYY"))
            var eventsArr = response.data;
            eventsArr.forEach(function(element) {
                console.log("Venue:", element.venue.name);
                console.log("Location:", element.venue.city + ", " + element.venue.region + " " + element.venue.country);
                console.log("Date:", moment((element.datetime)).format("MM/DD/YYYY"));
                console.log("");
            })
        })
    break;
    case "spotify-this-song":
        if (query) {
            spotify.search({ type: 'track', query: query, limit: 1 })
                .then(function(data) {
                    console.log("Artist(s):", data.tracks.items[0].album.artists[0].name);
                    console.log("Song:", data.tracks.items[0].name); 
                    console.log("Preview:", data.tracks.items[0].preview_url); 
                    console.log("Album:", data.tracks.items[0].album.name);
                    console.log("");
                })
                .catch(function(err) {
                    console.log(err);
                });
        } else {
            spotify.request('https://api.spotify.com/v1/tracks/6RLCQkGIeLR7aoaozvheNT')
            .then(function(data) {
                console.log("You forgot to enter a song,");
                console.log("I recommend listening to " + data.album.artists[0].name + "'s " + '"' + data.name + '"');
                console.log("");
            })
            .catch(function(err) {
                console.error('Error occurred: ' + err); 
            });
        }
    break;
    case "movie-this":
        if (query) {
            axios.get("http://www.omdbapi.com/?apikey=" + process.env.APIKEY + "&t=" + query + "&plot=short").then(function(response) {
                console.log("Title:", response.data.Title);
                console.log("Year:", response.data.Year);
                console.log("IMDB Rating:", response.data.Ratings[0].Value);
                console.log("RT Rating:", response.data.Ratings[1].Value);
                console.log("Country:", response.data.Country);
                console.log("Language:", response.data.Year);
                console.log("Plot:", response.data.Plot);
                console.log("Actors:", response.data.Actors);
                console.log("");
            })
        } else {
            axios.get("http://www.omdbapi.com/?apikey=" + process.env.APIKEY + "&t=arrival&plot=short").then(function(response) {
                console.log("You forgot to enter a movie,");
                console.log("I recommend that you look watch " + '"' + response.data.Title + '"');
                console.log("");
            })
        }
    break; 
    default:
        console.log("Default!");
}
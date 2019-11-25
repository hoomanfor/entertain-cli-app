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

switch (command) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + process.env.APP_ID).then(function(response) {
            // console.log(response.data[0].venue.name);
            // console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
            // console.log(moment((response.data[0].datetime)).format("MM/DD/YYYY"))
            var eventsArr = response.data;
            eventsArr.forEach(function(element) {
                console.log("Venue:", element.venue.name)
                console.log("Location:", element.venue.city + ", " + element.venue.region + " " + element.venue.country)
                console.log("Date:", moment((element.datetime)).format("MM/DD/YYYY") + "\n");
            })
        })
    break;
    default:
        console.log("Default!")
}
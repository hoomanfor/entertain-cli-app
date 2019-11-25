require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
moment().format();

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
console.log(command);
console.log(query);

axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + process.env.APP_ID).then(function(response) {
    console.log(response);
})

switch (command) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + process.env.APP_ID).then(function(response) {
            console.log(response);
        })
    break;
    default:
        console.log("Default!")
}
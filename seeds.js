var mongoose        = require("mongoose"),
    Campground      = require("./models/campground");

function seedDB(){
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
        console.log("All removed...")
        }
    });
}

module.exports = seedDB;
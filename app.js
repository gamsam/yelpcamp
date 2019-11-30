var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comments"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./models/user"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash");

// requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds");
    indexRoutes         = require("./routes/index");

// node config
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gamsam:Pillar96@yelpcamp-qg8ze.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Secret Page",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;    
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
 
// node config
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
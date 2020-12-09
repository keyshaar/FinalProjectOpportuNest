var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/User");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});


app.get("/index", isLoggedIn, function (req, res) {
    res.render("index");
});

// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password


    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(
            req, res, function () {
            res.render("login");
        });
    });
});

//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});


//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect:  "/index",
    failureRedirect: "/login"
}), function (req, res) {
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

//Log Out
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  })

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});

// ------------------------DEPENDENCIES------------------------

require('dotenv').config();
const port = process.env.PORT ? process.env.PORT : "3000";
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// --------------------------MIDDLEWARE--------------------------

// import middleware functions
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const referralsController = require('./controllers/referrals.js');
const usersController = require('./controllers/users.js');

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// middleware for using HTTP verbs such as PUT or Delete
app.use(methodOverride('_method'));
// morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
// styling middleware, though not quite sure where this should live within server.js
app.use(express.static(path.join(__dirname, "public")));

// // import User model
// const User = require('./models/user.js');

app.use(passUserToView);


// ----------------------------ROUTES----------------------------

// the code below is from cookbook lab, but it was sending "home" and "view pantry" to the pantry instead of "home" sending to a landing page. get route below does work as needed. 
// app.get('/', (req, res) => {
//     // Check if the user is signed in
//     if (req.session.user) {
//         // Redirect signed-in users to their referrals index
//         res.redirect(`/users/${req.session.user._id}/referrals`);
//     } else {
//         // Show the homepage for users who are not signed in
//         res.render('home.ejs');
//     }
// });

// this is from the session auth lesson
app.get("/", (req, res) => {
    res.render("home.ejs", {
        user: req.session.user,
    });
});

// -----------------------MORE MIDDLEWARE?-----------------------

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/referrals', referralsController);
app.use('/users', usersController);

// ----------------------------PORTS----------------------------

app.listen(3003, () => {
    console.log(`Listening on Port ${port}.`);
});
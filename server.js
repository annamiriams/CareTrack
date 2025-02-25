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

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const referralsController = require('./controllers/referrals.js');
const usersController = require('./controllers/users.js');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(passUserToView);

// ----------------------------ROUTES----------------------------

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

app.listen(port, () => {
    console.log(`Listening on Port ${port}.`);
});
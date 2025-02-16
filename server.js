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

// styling middleware
app.use(express.static(path.join(__dirname, "public")));

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

// import User model
const User = require('./models/user.js');

// ----------------------------ROUTES----------------------------

app.get('/', (req, res) => {
    res.render('home.ejs');
});

// ----------------------------PORTS----------------------------

app.listen(3000, () => {
    console.log(`Listening on Port ${port}.`);
});
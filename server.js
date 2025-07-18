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
const searchController = require('./controllers/globalsearch.js');

// adding      .catch(err => console.log( err )); to test in heroku
mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(err));
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

app.get('/preview', (req, res) => {
    res.render('preview.ejs', {
        caregiverRelationshipEnum: ['---caregiver---', 'Parent', 'Grandparent', 'Aunt/Uncle', 'Sibling', 'Other Family', 'Family Friend', 'DHS Caseworker', 'Unknown', 'Other'],
        providerRelationshipEnum: ['---provider---', 'Therapist', 'Prescriber', 'PCP', 'Teacher', 'Insurance Provider', 'Family', 'Unknown', 'Other'],
    });
});

// -----------------------MORE MIDDLEWARE?-----------------------

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/referrals', referralsController);
app.use('/users', usersController);
app.use('/', searchController);

// ----------------------------PORTS----------------------------

app.listen(port, () => {
    console.log(`Listening on Port ${port}.`);
});
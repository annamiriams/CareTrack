// help from cookbook lab

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    try {
        // check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }

        // if username is unique, check if the password and confirm password match
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match');
        }

        // hash the password before sending to the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);

        res.redirect('/auth/sign-in');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        // get the user from the database
        const userInDatabase = await User.findOne({ username: req.body.username });
        // if username is not in the database, show an error page
        if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
        }

        // if there is a user, use bcrypt to check if the pw matches database
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        // if pw doesn't match db, show error page
        if (!validPassword) {
            return res.send('Login failed. Please try again.');
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        };

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;

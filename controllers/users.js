const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// /users at the beginning of each route

// INDEX (users.ejs)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/users.ejs', { users: users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// SHOW (one user's referrals)
router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('users/index.ejs', { user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// SHOW (referral details)
router.get('/:userId/referrals/:referralId', async (req, res) => {
    try {
        // const currentUser = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('users/referral.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;
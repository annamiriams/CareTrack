const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

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


module.exports = router;
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/team.ejs', { users: users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// SHOW
router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('users/index.ejs', { user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// SHOW (includes show route from referrals.js to avoid route conflict)
router.get('/:userId/referrals/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentUserId = req.session.user._id;
        const otherUser = await User.findById(req.params.userId);
        const otherUserId = req.params.userId;
        const referral = currentUser.referrals.id(req.params.referralId);
        const otherUserReferral = otherUser.referrals.id(req.params.referralId);

        if (currentUserId === otherUserId) {
            res.render('referrals/show.ejs', { referral: referral });
        } else {
            res.render('users/show.ejs', { 
                otherUserReferral: otherUserReferral,
                otherUser: otherUser
            });
        };

    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;
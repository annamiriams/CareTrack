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
// maybe i can choose a new route below so it doesnt get intercepted by the same route in referrals.js?
// /users/
// router.get('/:userId/referrals/:referralId', async (req, res) => {
//     try {
//         // const currentUser = await User.findById(req.params.userId);
//         const user = await User.findById(req.params.userId);
//         const referral = currentUser.referrals.id(req.params.referralId);
//         res.render('users/referral.ejs', { referral: referral });
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     };
// });

// the above show route wasn't working because it was intercepted by the same route over in the referralsController. dad suggested i try and combine the two get routes. that wouldn't have worked in referrals.js because of the controller middleware, so i commented out the route in referrals.js and updated the route below to render show.ejs and referral.ejs depending on whether it's a referral from currentUser or otherUser.
router.get('/:userId/referrals/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentUserId = req.session.user._id;
        const otherUserId = req.params.userId;
        const referral = currentUser.referrals.id(req.params.referralId);
        console.log(req.session.user._id);
        console.log(req.params.userId);

        if (currentUserId === otherUserId) {
            res.render('referrals/show.ejs', { referral: referral });
        } else {
            // dad trying to explain the pseudocode for only allowing members of the same team to view referrals
            // read only referral
            // get teamId of currentUser
            // get teamId of otherUser
            // only render if teamId ===
            res.render('users/referral.ejs', { referral: referral });
        };

        // res.render('referrals/show.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;
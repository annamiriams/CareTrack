const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// /users/:userId/referrals

// INDEX
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('referrals/index.ejs', { referral: currentUser.referral });
});

// NEW
router.get('/new', async (req, res) => {
    res.render('referrals/new.ejs');
});

// DELETE

// UPDATE

// CREATE
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.referral.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/referrals`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// EDIT

// SHOW

module.exports = router;
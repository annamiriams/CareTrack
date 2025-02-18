const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// /users/:userId/referrals

// INDEX
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('referrals/index.ejs', { referrals: currentUser.referrals });
});

// NEW
router.get('/new', async (req, res) => {
    res.render('referrals/new.ejs');
});

// DELETE
router.delete('/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.referrals.id(req.params.referralId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/referrals`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// UPDATE
router.put('/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        referral.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/referrals`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// CREATE
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.referrals.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/referrals`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// EDIT
router.get('/:referralId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('referrals/edit.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// SHOW
router.get('/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('referrals/show.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;
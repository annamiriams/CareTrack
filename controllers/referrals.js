const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

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

        referral.name = req.body.name || referral.name;
        referral.birthday = req.body.birthday || referral.birthday; 
        referral.insurance = req.body.insurance || referral.insurance;
        referral.insuranceConfirmed = req.body.insuranceConfirmed === 'on' ? true : (referral.insuranceConfirmed || false);
        referral.dateInsuranceConfirmed = req.body.dateInsuranceConfirmed || referral.dateInsuranceConfirmed;
        referral.intakeScheduled = req.body.intakeScheduled === 'on' ? true : (referral.intakeScheduled || false);
        referral.intakeDate = req.body.intakeDate || referral.intakeDate;
        referral.intakeCompleted = req.body.intakeCompleted === 'on' ? true : (referral.intakeCompleted || false);

        await currentUser.save();
        res.render('referrals/show.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    console.log(req.body);
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

// EDIT: edit referral
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

// EDIT: confirm insurance
router.get('/:referralId/insurance', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('referrals/insurance.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// EDIT: schedule intake
router.get('/:referralId/schedule', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('referrals/schedule.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// EDIT: complete intake
router.get('/:referralId/complete', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);
        res.render('referrals/complete.ejs', { referral: referral });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Search referrals from personal referrals list
router.get('/search', async (req, res) => {
    const { firstName = '', lastName = '', dob = '' } = req.query;
    const currentUser = await User.findById(req.session.user._id);

    const filteredReferrals = currentUser.referrals.filter(referral => {
        const matchesFirstName = referral.name.firstName.toLowerCase().includes(firstName.toLowerCase());
        const matchesLastName = referral.name.lastName.toLowerCase().includes(lastName.toLocaleLowerCase());
        const matchesDOB = dob ? new Date(referral.birthday).toISOString().split('T')[0] === dob : true;

        return matchesFirstName && matchesLastName && matchesDOB
    });

    res.render('referrals/search.ejs', { referrals: filteredReferrals });
});

// SHOW route is included in users.js to avoid route conflict

module.exports = router;
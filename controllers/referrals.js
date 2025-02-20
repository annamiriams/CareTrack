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

// UPDATE: new/combined since i just learned (relearned?) that i can't have two put routes...
router.put('/:referralId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);

        // this commented out code block below is canceling out data entered. basically once i've confirmed insurance, and then go to schedule intake, as soon as i schedule intake, all my insurance confirmation data is wiped out.
        // // a la fruits app
        // if (req.body.insuranceConfirmed === "on") {
        //     req.body.insuranceConfirmed = true;
        // } else {
        //     req.body.insuranceConfirmed = false;
        // };

        // if (req.body.intakeScheduled === "on") {
        //     req.body.intakeScheduled = true;
        // } else {
        //     req.body.intakeScheduled = false;
        // };

        // // a la skyrockit app
        // referral.set(req.body);

        // chatgpt helped me figure out how to fix the issue above. basically by using referral.set(req.body) above each time a form is sent, we only send the data that was entered in that particular form and set req.body to match that new data sent, thereby overwriting all other fields/data.
        // first check that the fields exist, and if they don't exist, we leave the value as it was from referral. for booleans, we use "checkbox logic" to either update the field or leave as is
        // chatgpt explanation: In the PUT route, we manually check each field and assign a new value only if the field exists in the request body (req.body). If the field is not in the request body, we keep the current value from the existing referral.
        // This line checks if req.body.insurance is present (i.e., if the insurance field was filled in the form). If it is, it updates referral.insurance with that value. If req.body.insurance is missing (meaning the form didn't include it), the referral.insurance value remains unchanged (referral.insurance stays the same).
        referral.insurance = req.body.insurance || referral.insurance;
        // For the insuranceConfirmed checkbox, the value is "on" if checked. If req.body.insuranceConfirmed is "on", we set referral.insuranceConfirmed to true. If the checkbox isn't checked (i.e., if req.body.insuranceConfirmed is not "on"), we keep the existing value of referral.insuranceConfirmed unless it is undefined, in which case we set it to false.
        referral.insuranceConfirmed = req.body.insuranceConfirmed === "on" ? true : (referral.insuranceConfirmed || false);
        referral.dateInsuranceConfirmed = req.body.dateInsuranceConfirmed || referral.dateInsuranceConfirmed;

        // Intake related fields
        referral.intakeScheduled = req.body.intakeScheduled === "on" ? true : (referral.intakeScheduled || false);
        referral.intakeDate = req.body.intakeDate || referral.intakeDate;

        await currentUser.save();
        // i don't understand why redirect hasn't been working for me here...
        res.render('referrals/show.ejs', { referral: referral });
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
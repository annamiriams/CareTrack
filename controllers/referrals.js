const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const caregiverRelationshipEnum = [
    'Unknown', 'Parent', 'Grandparent', 'Aunt/Uncle', 'Sibling', 'Other Family', 'Family Friend', 'DHS Caseworker', 'Other'
  ];
const providerRelationshipEnum = [
    'Unknown', 'Therapist', 'Prescriber', 'PCP', 'Teacher', 'Insurance Provider', 'Family', 'Other'
];

// // PREVIEW
// router.get('/preview', (req, res) => {
//     res.render('referrals/preview.ejs', {
//         user: req.session.user,
//         caregiverRelationshipEnum,
//         providerRelationshipEnum
//     });
// });

// INDEX
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('referrals/index.ejs', { referrals: currentUser.referrals });
});

// NEW
router.get('/new', async (req, res) => {
    res.render('referrals/new.ejs', { caregiverRelationshipEnum, providerRelationshipEnum });
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
    // console.log(req.body);
    try {
        const currentUser = await User.findById(req.session.user._id);
        const referral = currentUser.referrals.id(req.params.referralId);

        referral.name.firstName = req.body['name.firstName'] || referral.name.firstName;
        referral.name.lastName = req.body['name.lastName'] || referral.name.lastName;
        referral.birthday = req.body.birthday || referral.birthday;
        referral.school = req.body.school || referral.school;
        referral.currentGrade = req.body.currentGrade || referral.currentGrade;
        referral.address = req.body.address || referral.address;

        referral.insurance = req.body.insurance || referral.insurance;
        referral.insuranceConfirmed = req.body.insuranceConfirmed === 'on' ? true : (referral.insuranceConfirmed || false);
        referral.dateInsuranceConfirmed = req.body.dateInsuranceConfirmed || referral.dateInsuranceConfirmed;
        referral.intakeScheduled = req.body.intakeScheduled === 'on' ? true : (referral.intakeScheduled || false);
        referral.intakeDate = req.body.intakeDate || referral.intakeDate;
        referral.intakeCompleted = req.body.intakeCompleted === 'on' ? true : (referral.intakeCompleted || false);

        referral.caregiverName.firstName = req.body['caregiverName.firstName'] || referral.caregiverName.firstName;
        referral.caregiverName.lastName = req.body['caregiverName.lastName'] || referral.caregiverName.lastName;
        referral.caregiverRelationship = req.body.caregiverRelationship || referral.caregiverRelationship;
        referral.caregiverIsGuardian = req.body.caregiverIsGuardian || referral.caregiverIsGuardian;
        referral.caregiverPhone = req.body.caregiverPhone || referral.caregiverPhone;
        referral.caregiverEmail = req.body.caregiverEmail || referral.caregiverEmail;

        referral.providerName.firstName = req.body['providerName.firstName'] || referral.providerName.firstName;
        referral.providerName.lastName = req.body['providerName.lastName'] || referral.providerName.lastName;
        referral.providerRelationship = req.body.providerRelationship || referral.providerRelationship;
        referral.providerPhone = req.body.providerPhone || referral.providerPhone;
        referral.providerEmail = req.body.providerEmail || referral.providerEmail;

        referral.notes = req.body.notes || referral.notes;

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/referrals/${referral._id}`);
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
        res.render('referrals/edit.ejs', { 
            referral: referral,
            user: currentUser,
            caregiverRelationshipEnum,
            providerRelationshipEnum, 
        });
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
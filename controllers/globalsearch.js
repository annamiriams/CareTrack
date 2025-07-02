const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/referrals/search', async (req, res) => {
    const { firstName = '', lastName = '', dob = '' } = req.query;

    try {
        // Get all users (with referrals and name)
        const allUsers = await User.find({}, { referrals: 1, name: 1 });

        let foundReferrals = [];

        allUsers.forEach(user => {
            const matchingReferrals = user.referrals.filter(referral => {
                const matchesFirstName = referral.name.firstName.toLowerCase().includes(firstName.toLowerCase());
                const matchesLastName = referral.name.lastName.toLowerCase().includes(lastName.toLowerCase());
                const matchesDOB = dob ? new Date(referral.birthday).toISOString().split('T')[0] === dob : true;
                return matchesFirstName && matchesLastName && matchesDOB;
            });

            foundReferrals = foundReferrals.concat(matchingReferrals);
        });

        res.render('referrals/globalsearch.ejs', { referrals: foundReferrals });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', { users: users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// SHOW

module.exports = router;
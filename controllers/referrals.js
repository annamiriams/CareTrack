const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    res.send('test');
});

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

module.exports = router;
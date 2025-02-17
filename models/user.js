const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        enum: ['Medicaid', 'Kaiser', 'PacificSource', 'Regence BCBS of Oregon', 'Optum']
    },
    insuranceConfirmed: Boolean,
    intakeScheduled: Boolean,
    intakeDate: Date,
    intakeComplete: Boolean
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    referral: [referralSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
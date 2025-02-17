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
        enum: ['medicaid', 'kaiser', 'pacificsource', 'regence', 'optum']
    },
    insuranceConfirmed: Boolean,
    intakeScheduled: Boolean,
    intakeDate: Date,
    intakeCompleted: Boolean
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
    referrals: [referralSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
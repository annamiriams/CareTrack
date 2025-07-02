const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
    },
    relationship: {
        type: String,
        enum: ['Parent', 'Grandparent', 'Aunt/Uncle', 'Sibling', 'Other Family', 'Family Friend', 'Other'],
    },
    isGuardian: Boolean,
    phone: {
        type: Number,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    notes: {
        type: String,
    }
})

const providerSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    phone: {
        type: Number,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    relationship: {
        type: String,
        enum: ['Therapist', 'Prescriber', 'PCP', 'Teacher', 'Insurance Provider', 'Family', 'Other'],
    },
    notes: {
        type: String,
    },
})

const referralSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    }, 
    birthday: {
        type: Date,
        required: true
    },
    insurance: {
        type: String,
        enum: ['medicaid', 'kaiser', 'pacificsource', 'regence', 'optum', 'unknown']
    },
    school: {
        type: String,
    },
    currentGrade: {
        type: Number,
    },
    address: {
        type: String,
    },
    caregiver: [caregiverSchema],
    provider: [providerSchema],
    insuranceConfirmed: Boolean,
    dateInsuranceConfirmed: Date,
    therapist: {
        type: String,
        enum: ['Ariel Cain', 'Zahra Luna', 'Bridger O\'Donnell', '', 'Malakai Daniels', 'Ayaan Pearson', 'Esperanza Valdez', 'Teagan Rocha', 'Jayden Wilcox'],
    },
    intakeScheduled: Boolean,
    intakeDate: Date,
    intakeCompleted: Boolean,
    notes: {
        type: String,
    },
});

const userSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    }, 
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        lowercase: true,
        trim: true,
        unique: true, 
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
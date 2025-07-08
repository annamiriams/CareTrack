const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    
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
    // CAREGIVER INFO
    caregiverName: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
    },
    caregiverRelationship: {
        type: String,
        enum: ['---caregiver---', 'Parent', 'Grandparent', 'Aunt/Uncle', 'Sibling', 'Other Family', 'Family Friend', 'DHS Caseworker', 'Unknown', 'Other'],
    },
    caregiverIsGuardian: {
        type: String,
        enum: ['yes', 'no', 'unknown'],
        default: 'unknown'
    },
    caregiverPhone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    caregiverEmail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        lowercase: true,
        trim: true,
    },
    // PROVIDER INFO
    providerName: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
    },
    providerRelationship: {
        type: String,
        enum: ['---provider---', 'Therapist', 'Prescriber', 'PCP', 'Teacher', 'Insurance Provider', 'Family', 'Unknown', 'Other'],
    },
    providerPhone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    providerEmail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        lowercase: true,
        trim: true,
    },
    insuranceConfirmed: Boolean,
    dateInsuranceConfirmed: Date,
    assignedProvider: {
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
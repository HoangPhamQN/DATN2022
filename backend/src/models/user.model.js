const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your family name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        validate: {
            // This only word with SAVE and CREATE
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same!'
        }
    },
    photoUrl: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: [true, "User must have a role!"],
    },
    isEnterpriseAcc: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    walletAddress: {
        type: String,
        required: [true, "Please provide your wallet address!"],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre('save', async function (next) {
    // only run this function if password is actually modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    // delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    // this point to the current query
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    givenName: {
        type: String,
        required: [true, "Please provide your given name!"],
    },
    familyName: {
        type: String,
        required: [true, "Please provide your family name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
    },
    photoUrl: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: [true, "User must have a role!"],
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "User must have Address!"],
    },
    isEnterpriseAcc: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
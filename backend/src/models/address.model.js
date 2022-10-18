const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Address must belong to User!"],
    },
    province: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a province!"],
    },
    district: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a district!"],
    },
    ward: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a ward!"],
    },
    hamlet: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a hamlet!"],
    },
    street: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a street!"],
    },
    detail: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "address must have a detail!"],
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

const address = mongoose.model("address", addressSchema);

module.exports = address;
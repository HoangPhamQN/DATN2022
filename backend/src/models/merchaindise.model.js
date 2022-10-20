const mongoose = require("mongoose");
const unit = require('../configs/unit')

const merchaindiseSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Merchaindise must have a name!"],
    },
    registrationCode: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Merchaindise must have a RegistrationCode!"],
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: [true, "Merchaindise must have a description!"],
    },
    imageAvatar: {
        type: String,
        maxlength: 500,
        trim: true,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
        max: 500000000,
    },
    quantity: {
        type: Number,
        required: true,
    },
    soldQuantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: unit,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Merchaindise must belong to owner!"],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: [true, "Merchaindise must belong to subcategory!"],
    },
    slug: {
        type: String,
        slug: "name",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

const Merchaindise = mongoose.model("Merchaindise", merchaindiseSchema);

module.exports = Merchaindise;
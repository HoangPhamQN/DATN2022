const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Category must have a name!"],
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    parent: {
        // type: mongoose.Schema.ObjectId,
        // ref: "Category",
        type: String,
    },
    tree_id: {
        type: Number,
        required: true
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

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
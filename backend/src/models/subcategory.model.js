const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "SubCategory must have a name!"],
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must belong to Category!"],
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

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
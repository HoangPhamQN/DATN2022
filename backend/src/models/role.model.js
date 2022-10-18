const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Role must have a name!"],
    },
    slug: {
        type: String,
        slug: "name",
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
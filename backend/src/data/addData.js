const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Tour = require('./../../models/tourModel');
// const Review = require('./../../models/reviewModel');
// const User = require('./../../models/userModel');
const { Category, User, Role, Merchaindise } = require("../models");

dotenv.config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connect MongoDB Successfully")
    } catch (error) {
        console.log("Connect MongoDB Failed")
    }
}

connect()
// READ JSON FILE
// const categorys = JSON.parse(fs.readFileSync('src/data/subcate.json', 'utf-8'));
// const roles = JSON.parse(fs.readFileSync('src/data/role.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync('src/data/user.json', 'utf-8'));
const merchains = JSON.parse(fs.readFileSync('src/data/merchaindise.json', 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
    try {
        // await Category.create(categorys);
        // await Role.create(roles);
        // await User.create(users);
        await Merchaindise.create(merchains);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};



const deleteData = async () => {
    try {
        // await Category.deleteMany();
        await Role.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
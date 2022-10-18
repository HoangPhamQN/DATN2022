const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Tour = require('./../../models/tourModel');
// const Review = require('./../../models/reviewModel');
// const User = require('./../../models/userModel');
const { Category } = require("../models");

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
const categorys = JSON.parse(fs.readFileSync('src/data/cate.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Category.create(categorys);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};



const deleteData = async () => {
    try {
        await Category.deleteMany();
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
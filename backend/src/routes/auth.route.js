const express = require("express");
const passport = require('passport')
require('../configs/passport')

const { AuthController, ViewController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();


router.route('/signup').post(upload.fields([
    { name: "photoUrl", maxCount: 1 },
]), AuthController.signup)
router.route('/signup').get(ViewController.getSignUpForm)
router.route('/login').get(ViewController.getLoginForm)
router.route('/login').post(AuthController.login)
router.route('/logout').get(AuthController.logout)
module.exports = router
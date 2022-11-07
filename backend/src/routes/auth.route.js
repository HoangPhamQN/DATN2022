const express = require("express");
const passport = require('passport')
require('../configs/passport')

const { AuthController } = require("../controllers");

// const upLoadImage = require("../middlewares/imgUpload");

const router = express.Router();

router.route("/google").get(
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
router.route('/google/callback').get(AuthController.temp);
module.exports = router
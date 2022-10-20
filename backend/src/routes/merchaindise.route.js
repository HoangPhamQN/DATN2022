const express = require("express");

const { MerchaindiseController } = require("../controllers");

// const upLoadImage = require("../middlewares/imgUpload");

const router = express.Router();


router.route("/").get(MerchaindiseController.getAllMerchaindise);

module.exports = router;
const express = require("express");

const { MerchaindiseController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();


router.route("/").get(MerchaindiseController.getAllMerchaindise);
router.route("/detail/:id").get(MerchaindiseController.getDetail)
router.route("/delete/:id").delete(MerchaindiseController.deleteMerchaindise)
router.route("/update/:id").patch(upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), MerchaindiseController.updateMerchaindise)
router.route("/create").post(upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), MerchaindiseController.createMerchaindise)

module.exports = router;
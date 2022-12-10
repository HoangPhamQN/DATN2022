const express = require("express");

const { MerchaindiseController, AuthController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();


router.route("/tat-ca-mat-hang").get(AuthController.protect, MerchaindiseController.getAllMerchaindise);
router.route("/vat-tu-y-te").get(AuthController.protect, MerchaindiseController.getMedicalSupplies);
router.route("/:slug").get(AuthController.protect, MerchaindiseController.getMerchaindiseByCategory);
router.route("/chi-tiet/:id").get(AuthController.protect, MerchaindiseController.getDetail);
router.route("/delete/:id").patch(AuthController.protect, MerchaindiseController.deleteMerchaindise);
router.route("/update/:id").patch(AuthController.protect, MerchaindiseController.updateMerchaindise)
router.route("/create").post(AuthController.protect, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]), MerchaindiseController.createMerchaindise)

module.exports = router;
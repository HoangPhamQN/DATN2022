const express = require("express");

const { UserController, AuthController, UserContractController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();
router.route("/:id").get(AuthController.protect, UserController.getMe);
router.route("/:id/don-hang-cua-ban").get(AuthController.protect, UserContractController.getContractByUser);
// router.route("/:id/don-ban").get(AuthController.protect, UserController.soldOrder);
router.route("/:id/thong-bao").get(AuthController.protect, UserController.noti);
router.route("/:id/tat-ca-bai-dang").get(AuthController.protect, UserController.getMerchaindiseByOwner);
router.route("/:id/don-mua").get(AuthController.protect, UserContractController.getContractByUser);
router.route("/:id/don-ban").get(AuthController.protect, UserContractController.getContractBySeller);
router.route("/san-pham/:id").get(AuthController.protect, UserController.getDetailMerchaindise);

module.exports = router
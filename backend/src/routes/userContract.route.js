const express = require("express");

const { AuthController, UserContractController } = require("../controllers");
const router = express.Router();
router.route("/:address").get(UserContractController.getAbiByContractAddress);
router.route("/:address").delete(UserContractController.deleteUserContractByAddress);
router.route("/don-mua/:address").get(AuthController.protect, UserContractController.getContractDetail);
router.route("/don-ban/:address").get(AuthController.protect, UserContractController.getSoldContractDetail);
router.route("/xac-nhan/:address").post(AuthController.protect, UserContractController.confirmGivenMerchaindise);
router.route("/complete/:address").post(AuthController.protect, UserContractController.confirmCompleted);
router.route("/xac-nhan-boi-nguoi-ban/:address").post(AuthController.protect, UserContractController.confirmBySeller);
router.route("/huy-don-boi-nguoi-mua/:address/:id").post(AuthController.protect, UserContractController.cancelByBuyer);
router.route("/huy-don-boi-nguoi-ban/:address/:id").post(AuthController.protect, UserContractController.cancelBySeller);

module.exports = router
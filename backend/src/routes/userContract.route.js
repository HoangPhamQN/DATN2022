const express = require("express");

const { AuthController, UserContractController } = require("../controllers");
const router = express.Router();
router.route("/:address").get(UserContractController.getAbiByContractAddress);
router.route("/:address").delete(UserContractController.deleteUserContractByAddress);
router.route("/don-mua/:address").get(AuthController.protect, UserContractController.getContractDetail);
router.route("/don-ban/:address").get(AuthController.protect, UserContractController.getSoldContractDetail);
router.route("/xac-nhan/:address").post(AuthController.protect, UserContractController.confirmGivenMerchaindise);
router.route("/complete/:address").post(AuthController.protect, UserContractController.confirmCompleted);


module.exports = router
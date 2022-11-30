const express = require("express");

const { AuthController, UserContractController } = require("../controllers");
const router = express.Router();
router.route("/:address").get(UserContractController.getAbiByContractAddress);
router.route("/:address").delete(UserContractController.deleteUserContractByAddress);

module.exports = router
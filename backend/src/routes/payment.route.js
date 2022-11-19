const express = require("express");

const { PaymentController, AuthController } = require("../controllers");

const router = express.Router();
router.route("/:id").post(AuthController.protect, PaymentController.createAndDeployContract);
router.route('/:id').get(AuthController.protect, PaymentController.getPaymentForm)

module.exports = router
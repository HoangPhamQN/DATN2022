const express = require("express");

const { UserController, AuthController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();
router.route("/:id").get(AuthController.protect, UserController.getMe);
router.route("/:id/don-mua").get(AuthController.protect, UserController.boughtOrder);
router.route("/:id/don-ban").get(AuthController.protect, UserController.soldOrder);
router.route("/:id/thong-bao").get(AuthController.protect, UserController.noti);

module.exports = router
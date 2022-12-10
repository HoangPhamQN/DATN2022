const express = require("express");

const { UserController, AuthController, UserContractController, ViewController } = require("../controllers");
const upload = require('../middlewares/upload');

const router = express.Router();
router.route("/:id/dang-bai").get(AuthController.protect, ViewController.getCreateMerchaindiseForm);
router.route("/admin").get(AuthController.protect, UserController.getAdminpage);
router.route("/admin/quan-ly-nguoi-dung").get(AuthController.protect, UserController.listUser);
router.route("/admin/quan-ly-san-pham").get(AuthController.protect, UserController.manageMerchaindise);
router.route("/admin/quan-ly-danh-muc").get(AuthController.protect, UserController.manageCategory);
router.route("/admin/chi-tiet-nguoi-dung/:id").get(AuthController.protect, UserController.getUserById);
router.route("/admin/chi-tiet-san-pham/:id").get(AuthController.protect, UserController.getMerchaindiseById);
router.route("/admin/chi-tiet-danh-muc/:id").get(AuthController.protect, UserController.getCateById);
router.route("/:id").get(AuthController.protect, UserController.getMe);
router.route("/:id/don-hang-cua-ban").get(AuthController.protect, UserContractController.getContractByUser);
// router.route("/:id/don-ban").get(AuthController.protect, UserController.soldOrder);
router.route("/:id/thong-bao").get(AuthController.protect, UserController.noti);
router.route("/:id/tat-ca-bai-dang").get(AuthController.protect, UserController.getMerchaindiseByOwner);
router.route("/:id/don-mua").get(AuthController.protect, UserContractController.getContractByUser);
router.route("/:id/don-ban").get(AuthController.protect, UserContractController.getContractBySeller);
router.route("/san-pham/:id").get(AuthController.protect, UserController.getDetailMerchaindise);


module.exports = router
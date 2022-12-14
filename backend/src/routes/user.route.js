const express = require("express");

const { UserController, AuthController, UserContractController, ViewController, CategoryController } = require("../controllers");
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
router.route("/admin/them-danh-muc").get(AuthController.protect, ViewController.getCreateCategoryForm);
router.route("/admin/them-danh-muc").post(AuthController.protect, CategoryController.createCate);
router.route("/admin/xoa-danh-muc/:id").delete(AuthController.protect, CategoryController.deleteCate);

router.route("/:id").get(AuthController.protect, UserController.getMe);
router.route("/:id/don-hang-cua-ban").get(AuthController.protect, UserContractController.getContractByUser);
// router.route("/:id/don-ban").get(AuthController.protect, UserController.soldOrder);
router.route("/:id/thong-bao").get(AuthController.protect, UserController.noti);
router.route("/:id/tat-ca-bai-dang").get(AuthController.protect, UserController.getMerchaindiseByOwner);
router.route("/:id/don-mua").get(AuthController.protect, UserContractController.getContractByUser);
router.route("/:id/don-ban").get(AuthController.protect, UserContractController.getContractBySeller);
router.route("/:id/don-ban-moi").get(AuthController.protect, UserContractController.getNewContractBySeller);
router.route("/san-pham/:id").get(AuthController.protect, UserController.getDetailMerchaindise);
router.route('/lock/:id').patch(AuthController.protect, UserController.lockUser)
router.route('/unlock/:id').patch(AuthController.protect, UserController.unlockUser)
router.route('/delete/:id').patch(AuthController.protect, UserController.deleteUser)
router.route('/recover/:id').patch(AuthController.protect, UserController.recoverUser)
router.route('/add-role-seller/:id').patch(AuthController.protect, UserController.addRoleSeller)
router.route('/remove-role-seller/:id').patch(AuthController.protect, UserController.removeRoleSeller)
router.route('/check-balance/:id').post(AuthController.protect, UserController.checkBalance)


module.exports = router
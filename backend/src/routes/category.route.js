const express = require("express");

const { CategoryController } = require("../controllers");

// const upLoadImage = require("../middlewares/imgUpload");

const router = express.Router();


router.route("/").get(CategoryController.getAllCategory);
router.route("/:parentId/sub-category").get(CategoryController.getSubCate);
router.route("/:id/merchaindise").get(CategoryController.getSubCategoryMerchaindise);

module.exports = router;
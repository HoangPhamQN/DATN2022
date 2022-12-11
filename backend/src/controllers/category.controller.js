const catchAsync = require("../utils/catchAsync");
const { CategoryService } = require("../services");
const AppError = require("../utils/AppError");
const { reset } = require("nodemon");

const getAllCategory = catchAsync(async (req, res, next) => {
    const categories = await CategoryService.getAllCategory(req.query);
    if (!categories || categories.length === 0) {
        return next(new AppError("Categories Not Found!", 404));
    } else {
        res.status(200).json({
            "data": categories,
            "totalCount": categories.length
        });
    }
});

const getSubCate = catchAsync(async (req, res, next) => {
    const subCates = await CategoryService.getSubCate(req.params.parentId);
    if (!subCates || subCates.length === 0) {
        return next(new AppError("Sub Categories Not Found!", 404));
    } else {
        res.status(200).json({
            "data": subCates,
            "totalCount": subCates.length
        });
    }
})

const getSubCategoryMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindises = await CategoryService.getSubCateMerchaindise(req.params.id)
    if (!merchaindises || merchaindises.length === 0) {
        return next(new AppError("merchaindises Not Found!", 404));
    } else {
        res.status(200).json({
            "data": merchaindises,
            "totalCount": merchaindises.length
        });
    }
})

const manageCategory = catchAsync(async (req, res, next) => {
    const categories = await CategoryService.manageCategory();
    if (!categories) {
        res.status(404).render('error');
    } else {
        res.render('manage-category', categories)
    }
})

const updateCategory = catchAsync(async (req, res, next) => {
    const cate = await CategoryService.updateCategory(req.params.id, req.body);
    if (!cate) {
        res.status(400).render('error')
    } else {
        res.status(200).json({ cate })
    }
})

const createCate = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const cate = await CategoryService.createCate(req.body);
    if (!cate) {
        res.status(400).render('error')
    } else {
        res.status(200).redirect('http://localhost:4000/user/admin/quan-ly-danh-muc')
    }
})

const deleteCate = catchAsync(async (req, res, next) => {
    const deletedCate = await CategoryService.deleteCate(req.params.id);
    if (!deletedCate) {
        res.status(400).render('error')
    } else {
        res.status(200).json({ deletedCate })
    }
})

module.exports = {
    getAllCategory,
    getSubCate,
    getSubCategoryMerchaindise,
    manageCategory,
    updateCategory,
    createCate,
    deleteCate
}
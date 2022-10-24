const catchAsync = require("../utils/catchAsync");
const { CategoryService } = require("../services");
const AppError = require("../utils/AppError");

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

module.exports = {
    getAllCategory,
    getSubCate,
    getSubCategoryMerchaindise
}
const catchAsync = require("../utils/catchAsync");
const { MerchaindiseService } = require("../services");
const AppError = require("../utils/AppError");
const { Merchaindise } = require("../models");

const getAllMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindises = await MerchaindiseService.getAllMerchaindise(req.query);
    if (!merchaindises || merchaindises.length === 0) {
        return next(new AppError("Merchaindises Not Found!", 404));
    } else {
        res.status(200).json({
            "data": merchaindises,
            "totalCount": merchaindises.length
        });
    }
});

const getDetail = catchAsync(async (req, res, next) => {
    const merchaindise = await MerchaindiseService.getDetail(req.params.id);
    if (!merchaindise) {
        return next(new AppError("Merchaindise Not Found!", 404));
    } else {
        res.status(200).json({
            "data": merchaindise,
            "totalCount": merchaindise.length
        });
    }
})

const deleteMerchaindise = catchAsync(async (req, res, next) => {
    const deletedMerchaindise = await MerchaindiseService.deleteMerchaindise(req.params.id);
    if (deletedMerchaindise !== 1) {
        return next(
            new AppError(`Can Not Delete Merchaindise With Id ${req.params.id}`, 400)
        );
    } else {
        res.status(204).send();
    }
});

const createMerchaindise = catchAsync(async (req, res, next) => {
    if (!req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
        return next(new ApiError('Vui lòng chọn ảnh cho mặt hàng!', 400));
    }
    const image1Path = req.files.image1[0].path;
    const image2Path = req.files.image2[0].path;
    const image3Path = req.files.image3[0].path;
    const image4Path = req.files.image4[0].path;
    const imagesPath = [];
    imagesPath.push(image2Path);
    imagesPath.push(image3Path);
    imagesPath.push(image4Path);
    const body = Object.assign(
        req.body,
        { imageAvatar: image1Path },
        { images: imagesPath }
    );
    const merchaindise = await MerchaindiseService.createMerchaindise(body);
    if (!merchaindise) {
        return next(
            new AppError('Can not create new Merchaindise, please check again!', 400)
        );
    } else {
        res.status(200).json({
            "data": merchaindise,
            "totalCount": merchaindise.length
        });
    }
})

const updateMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindiseDetail = await Merchaindise.findById(req.params.id)
    let imageAvatarPath, image1, image2, image3, image4, imagesPath = []
    if (req.files) {
        console.log("file co")
        imageAvatarPath = req.files.image1 ? req.files.image1[0].path : merchaindiseDetail.imageAvatar
        image2 = req.files.image2 ? req.files.image2[0].path : merchaindiseDetail.images[0]
        image3 = req.files.image3 ? req.files.image3[0].path : merchaindiseDetail.images[1]
        image4 = req.files.image4 ? req.files.image4[0].path : merchaindiseDetail.images[2]
        imagesPath.push(image1);
        imagesPath.push(image2);
        imagesPath.push(image3);
    } else {
        imageAvatarPath = merchaindiseDetail.imageAvatar
        image1 = merchaindiseDetail.images[0]
        image2 = merchaindiseDetail.images[1]
        image3 = merchaindiseDetail.images[2]
        imagesPath.push(image1);
        imagesPath.push(image2);
        imagesPath.push(image3);
    }
    console.log("body: ", req.body)
    const body = Object.assign(
        req.body,
        { imageAvatar: imageAvatarPath },
        { images: imagesPath }
    );
    const merchaindise = await MerchaindiseService.updateMerchaindise(req.params.id, body);
    if (!merchaindise) {
        return next(
            new AppError(`Can not update merchaindise with id ${req.params.id}, please check again!`, 400)
        );
    } else {
        res.status(200).json({
            "data": merchaindise,
            "totalCount": merchaindise.length
        });
    }
})

module.exports = {
    getAllMerchaindise,
    getDetail,
    deleteMerchaindise,
    createMerchaindise,
    updateMerchaindise
}
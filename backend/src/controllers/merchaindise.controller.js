const catchAsync = require("../utils/catchAsync");
const { MerchaindiseService, UserService } = require("../services");
const AppError = require("../utils/AppError");
const { Merchaindise } = require("../models");
const { getCategoryName } = require('../utils/category')

const getAllMerchaindise = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const page = req.query.page;
    const limit = req.query.limit;
    const merchaindises = await MerchaindiseService.getAllMerchaindise(req.query);
    if (!merchaindises || merchaindises.length === 0) {
        res.status(404).render('empty-list-for-user', { medicals, supplies })
    }
    res.status(200).render('overview', {
        title: 'Danh sách mặt hàng',
        merchaindises,
        medicals,
        supplies,
        page,
        limit
    });
});

const getDetail = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    let merchaindise = await MerchaindiseService.getDetail(req.params.id);
    if (merchaindise.length == 0) {
        res.status(404).render('error')
    } else {
        merchaindise = merchaindise[0]
        res.status(200).render('merchaindise', {
            title: merchaindise.name,
            merchaindise, medicals, supplies
        });
    }
})

const deleteMerchaindise = catchAsync(async (req, res, next) => {
    const deletedMerchaindise = await MerchaindiseService.deleteMerchaindise(req.params.id);
    if (!deletedMerchaindise) {
        res.status(400).render('error');
    } else {
        res.status(200).redirect(`/user/${req.user.id}`);
    }
});

const createMerchaindise = catchAsync(async (req, res, next) => {
    if (!req.files.image1 || !req.files.image2 || !req.files.image3) {
        return next(new AppError('Vui lòng chọn ảnh cho mặt hàng!', 400));
    }
    const image1Path = req.files.image1[0].path;
    const image2Path = req.files.image2[0].path;
    const image3Path = req.files.image3[0].path;
    const imagesPath = [];
    imagesPath.push(image1Path);
    imagesPath.push(image2Path);
    imagesPath.push(image3Path);
    const body = Object.assign(
        req.body,
        { imageAvatar: image1Path },
        { images: imagesPath },
        { owner: req.user.id }
    );
    const merchaindise = await MerchaindiseService.createMerchaindise(body);
    if (!merchaindise) {
        res.status(404).render('error');
    } else {
        // const { medicals, supplies } = await getCategoryName()
        // const me = await UserService.getMe(req.user.id)
        // const merchaindises = await MerchaindiseService.getMerchaindiseByOwner(req.user.id);
        res.status(200).redirect(`/user/${req.user.id}/tat-ca-bai-dang?page=1&limit=3`);
    }
})

const updateMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindise = await MerchaindiseService.updateMerchaindise(req.params.id, req.body);
    if (!merchaindise) {
        res.status(400).render('error')
    }
    res.json({ merchaindise });
})

const getMedicalSupplies = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const merchaindises = await MerchaindiseService.getMedicalSupplies();
    if (!merchaindises || merchaindises.length === 0) {
        res.status(404).render('empty-list', { medicals, supplies })
    }
    res.status(200).render('overview', {
        title: 'Danh sách mặt hàng',
        merchaindises
    });
})

const temp = catchAsync(async (req, res, next) => {
    res.render('merchaindise')
})

const getMerchaindiseByCategory = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const page = req.query.page;
    const limit = req.query.limit;
    const merchaindises = await MerchaindiseService.getMerchaindiseByCategory(req.params.slug, req.query)
    if (!merchaindises || merchaindises.length === 0) {
        res.status(404).render('empty-list-for-user', { medicals, supplies })
    }
    res.status(200).render('overview', {
        title: 'Danh sách mặt hàng',
        merchaindises,
        medicals,
        supplies,
        page,
        limit
    });
})

const getMerchaindiseByOwner = catchAsync(async (req, res, next) => {
    const result = await MerchaindiseService.getMerchaindiseByOwner(req.params.id);
    res.json({ result })
})

const checkExistQuantity = catchAsync(async (req, res, next) => {
    const { check, num } = await MerchaindiseService.checkExistQuantity(req.body.quantity, req.params.slug);
    console.log(num)
    res.status(200).send({ check, num })
})

module.exports = {
    getAllMerchaindise,
    getDetail,
    deleteMerchaindise,
    createMerchaindise,
    updateMerchaindise,
    getMedicalSupplies,
    getMerchaindiseByCategory,
    getMerchaindiseByOwner,
    checkExistQuantity
}
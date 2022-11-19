const catchAsync = require("../utils/catchAsync");
const { UserService } = require("../services");
const AppError = require("../utils/AppError");
const { User } = require("../models");
const { getCategoryName } = require('../utils/category')

const getMe = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('me', { me, medicals, supplies })
})

const boughtOrder = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('bought_order', { me, medicals, supplies })
})

const soldOrder = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('sold_order', { me, medicals, supplies })
})

const noti = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('noti', { me, medicals, supplies })
})
module.exports = {
    getMe,
    boughtOrder,
    soldOrder,
    noti
}
const catchAsync = require("../utils/catchAsync");
const { UserService, UserContractService, MerchaindiseService, CategoryService } = require("../services");
const AppError = require("../utils/AppError");
const { User } = require("../models");
const { getCategoryName } = require('../utils/category')
const Web3 = require("web3");

// Setting up a HttpProvider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const getMe = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    // let orderResult = []
    // let orderWithRoleSeller = []
    // const contractsByUser = await UserContractService.getContractByUser(req.params.id);
    // const contractsBySeller = await UserContractService.getContractBySeller(req.params.id);
    // const merchaindiseByOwner = await MerchaindiseService.getMerchaindiseByOwner(req.params.id)
    // if (contractsByUser) {
    //     for (ele of contractsByUser) {
    //         let abi = ele['abi'];
    //         let address = ele['contractAddress'];
    //         let contract = await new web3.eth.Contract(abi, address);
    //         let orderInfo = await contract.methods.getOrder().call();
    //         orderResult.push(orderInfo);
    //     }
    // }
    // if (contractsBySeller) {
    //     for (ele of contractsBySeller) {
    //         let abi = ele['abi'];
    //         let address = ele['contractAddress'];
    //         let contract = await new web3.eth.Contract(abi, address);
    //         let orderInfo = await contract.methods.getOrder().call();
    //         orderWithRoleSeller.push(orderInfo);
    //     }
    // }
    res.render('me-test', { me, medicals, supplies })
})

const boughtOrder = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('bought_order', { me, medicals, supplies })
})

const soldOrder = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('sold-order', { me, medicals, supplies })
})

const noti = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    res.render('noti', { me, medicals, supplies })
})

const getMerchaindiseByOwner = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    const merchaindises = await MerchaindiseService.getMerchaindiseByOwner(req.params.id);
    if (!merchaindises) {
        res.status(404).render('error');
    }
    res.status(200).render('my-merchaindises', { merchaindises, me, medicals, supplies })
})

const getDetailMerchaindise = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const me = await UserService.getMe(req.params.id)
    const merchaindise = await MerchaindiseService.getDetail(req.params.id);
    res.render('my-merchaindise', { merchaindise, medicals, supplies, me })
})

const getAdminpage = catchAsync(async (req, res, next) => {
    res.render('admin');
})

const listUser = catchAsync(async (req, res, next) => {
    const listUser = await UserService.listUser(req.query);
    res.render('manage-user', { listUser })
})

const getUserById = catchAsync(async (req, res, next) => {
    const userDetail = await UserService.getUserById(req.params.id);
    if (!userDetail) {
        res.status(404).render('error');
    }
    else {
        res.render('user-detail', { userDetail });
    }
})

const manageMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindises = await MerchaindiseService.getAllMerchaindise(req.query);
    if (!merchaindises) {
        res.status(404).render('error');
    } else {
        res.render('manage-merchaindises', { merchaindises })
    }
})

const getMerchaindiseById = catchAsync(async (req, res, next) => {
    const merchaindise = await MerchaindiseService.getDetail(req.params.id);
    if (!merchaindise) {
        res.status(404).render('error');
    } else {
        res.render('merchaindise-detail', { merchaindise });
    }
})

const manageCategory = catchAsync(async (req, res, next) => {
    const categories = await CategoryService.manageCategory(req.query);
    if (!categories) {
        res.status(404).render('error');
    } else {
        res.render('manage-category', { categories })
    }
})

const getCateById = catchAsync(async (req, res, next) => {
    const cate = await CategoryService.getDetailCate(req.params.id);
    if (!cate) {
        res.status(404).render('error');
    } else {
        res.render('category-detail', { cate })
    }
})
module.exports = {
    getMe,
    boughtOrder,
    soldOrder,
    noti,
    getMerchaindiseByOwner, getDetailMerchaindise,
    getAdminpage,
    listUser,
    getUserById,
    manageMerchaindise,
    getMerchaindiseById,
    manageCategory,
    getCateById
}
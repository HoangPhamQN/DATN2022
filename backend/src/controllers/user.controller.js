const catchAsync = require("../utils/catchAsync");
const { UserService, UserContractService, MerchaindiseService } = require("../services");
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
module.exports = {
    getMe,
    boughtOrder,
    soldOrder,
    noti,
    getMerchaindiseByOwner, getDetailMerchaindise
}
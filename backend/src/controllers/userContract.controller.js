const catchAsync = require("../utils/catchAsync");
const { UserContractService, UserService } = require("../services");
const { getCategoryName } = require("../utils/category");

const Web3 = require("web3");
const { forEach } = require("../configs/unit");

// Setting up a HttpProvider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const getAbiByContractAddress = catchAsync(async (req, res, next) => {
    const abi = await UserContractService.getAbiByContractAddress(req.params.address);
    res.json({
        status: 200,
        abi
    });
});

const deleteUserContractByAddress = catchAsync(async (req, res, next) => {
    const deletedCount = await UserContractService.deleteUserContractByAddress(req.params.address);
    res.json({
        status: 204
    });
});

const getContractByUser = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.params.id);
    let orderResult = []
    const contractsByUser = await UserContractService.getContractByUser(req.params.id);
    for (ele of contractsByUser) {
        let abi = ele['abi'];
        let address = ele['contractAddress'];
        let contract = await new web3.eth.Contract(abi, address);
        let orderInfo = await contract.methods.getOrder().call();
        orderResult.push(orderInfo);
    }
    if (!contractsByUser) {
        res.status(404).render('error')
    }
    res.render('order', {
        orderResult, me, medicals, supplies
    });
})

const getContractBySeller = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.params.id);
    let orderResult = []
    const contractsBySeller = await UserContractService.getContractBySeller(req.params.id);
    for (ele of contractsBySeller) {
        let abi = ele['abi'];
        let address = ele['contractAddress'];
        let contract = await new web3.eth.Contract(abi, address);
        let orderInfo = await contract.methods.getOrder().call();
        orderResult.push(orderInfo);
    }
    if (!contractsBySeller) {
        res.status(404).render('error')
    }
    res.render('sold-order', {
        orderResult, me, medicals, supplies
    });
})

const getContractDetail = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = req.user;
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    if (!orderInfo) {
        res.status(404).render('error')
    }
    let seller = await UserService.getSeller(orderInfo.seller);
    res.render('order-detail', {
        orderInfo, me, seller, medicals, supplies, address
    });
})

const getSoldContractDetail = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = req.user;
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    if (!orderInfo) {
        res.status(404).render('error')
    }
    let buyer = await UserService.getBuyer(orderInfo.buyer);
    res.render('sold-order-detail', {
        orderInfo, me, buyer, medicals, supplies, address
    });
})

const confirmGivenMerchaindise = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.user.id);
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    await contract.methods.changeStatus('1').send({ from: orderInfo['buyer'] });
    orderInfo = await contract.methods.getOrder().call();
    console.log(22222222, orderInfo['dueDate']);
    res.status(200).json({
        success: true
    });
})

const confirmCompleted = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.user.id);
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    await contract.methods.changeStatus('4').send({ from: orderInfo['buyer'] });
    orderInfo = await contract.methods.getOrder().call();
    console.log(22222222, orderInfo['dueDate']);
    res.status(200).json({
        success: true
    });
})


module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser,
    getContractDetail,
    getSoldContractDetail,
    confirmGivenMerchaindise,
    getContractBySeller,
    confirmCompleted
}
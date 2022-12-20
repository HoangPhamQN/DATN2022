const catchAsync = require("../utils/catchAsync");
const { UserContractService, UserService } = require("../services");
const { getCategoryName } = require("../utils/category");

const Web3 = require("web3");
const { forEach } = require("../configs/unit");
const { Merchaindise } = require("../models");

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
    const deletedContract = await UserContractService.deleteUserContractByAddress(req.params.address);
    if (!deletedContract) {
        res.status(404).render('error')
    } else {
        res.status(200).json({ deletedContract })
    }
});

const getContractByUser = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.params.id);
    let page = req.query.page;
    let limit = req.query.limit;
    let orderResult = []
    const contractsByUser = await UserContractService.getContractByUser(req.params.id, req.query);
    for (ele of contractsByUser) {
        let abi = ele['abi'];
        let address = ele['contractAddress'];
        let time = ele['createdAt'];
        time = (new Date(time)).toString();
        time = time.slice(0, 24);
        let name = time.replaceAll(' ', '-');
        name = name.replaceAll(':', '-');
        let contract = await new web3.eth.Contract(abi, address);
        let balance = await contract.methods.getBalance().call();
        let orderInfo = await contract.methods.getOrder().call();
        let merchaindiseId = orderInfo['id'];
        if (balance == 0 && orderInfo['status'] == 0) {
            await contract.methods.changeStatus('3').send({ from: orderInfo['buyer'] });
            let merchaindise = await Merchaindise.findById(merchaindiseId);
            merchaindise.quantity += parseInt(orderInfo['quantity']);
            merchaindise.soldQuantity -= parseInt(orderInfo['quantity']);
            merchaindise.save()
        }
        result = { info: orderInfo, balance: balance, name: name }
        orderResult.push(result);
    }
    if (!orderResult || orderResult.length == 0) {
        res.render('empty-list-for-user', { medicals, supplies })
    }
    res.render('order', {
        orderResult, me, medicals, supplies, page, limit
    });
})

const getContractBySeller = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.params.id);
    let page = req.query.page;
    let limit = req.query.limit;
    let orderResult = []
    const contractsBySeller = await UserContractService.getContractBySeller(req.params.id, req.query);
    for (ele of contractsBySeller) {
        let abi = ele['abi'];
        let address = ele['contractAddress'];
        let time = ele['createdAt'];
        time = (new Date(time)).toString();
        time = time.slice(0, 24);
        let name = time.replaceAll(' ', '-');
        name = name.replaceAll(':', '-');
        let contract = await new web3.eth.Contract(abi, address);
        let balance = await contract.methods.getBalance().call();
        let orderInfo = await contract.methods.getOrder().call();
        let merchaindiseId = orderInfo['id'];
        if (balance == 0 && orderInfo['status'] == 0) {
            await contract.methods.changeStatus('3').send({ from: orderInfo['buyer'] });
            let merchaindise = await Merchaindise.findById(merchaindiseId);
            merchaindise.quantity += parseInt(orderInfo['quantity']);
            merchaindise.soldQuantity -= parseInt(orderInfo['quantity']);
            merchaindise.save()
        }
        result = { info: orderInfo, balance: balance, name: name }
        orderResult.push(result);
    }
    if (!orderResult || orderResult.length == 0) {
        res.status(404).render('empty-list-for-user', { medicals, supplies })
    }
    res.render('sold-order', {
        orderResult, me, medicals, supplies, page, limit
    });
})

const getNewContractBySeller = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = await UserService.getMe(req.params.id);
    let page = req.query.page;
    let limit = req.query.limit;
    let orderResult = []
    const contractsBySeller = await UserContractService.getContractBySeller(req.params.id, req.query);
    for (ele of contractsBySeller) {
        let abi = ele['abi'];
        let address = ele['contractAddress'];
        let time = ele['createdAt'];
        time = (new Date(time)).toString();
        time = time.slice(0, 24);
        let name = time.replaceAll(' ', '-');
        name = name.replaceAll(':', '-');
        let contract = await new web3.eth.Contract(abi, address);
        let balance = await contract.methods.getBalance().call();
        let orderInfo = await contract.methods.getOrder().call();
        let merchaindiseId = orderInfo['id'];
        if (balance == 0 && orderInfo['status'] == 0) {
            await contract.methods.changeStatus('3').send({ from: orderInfo['buyer'] });
            let merchaindise = await Merchaindise.findById(merchaindiseId);
            merchaindise.quantity += parseInt(orderInfo['quantity']);
            merchaindise.soldQuantity -= parseInt(orderInfo['quantity']);
            merchaindise.save()
        }
        orderInfo = await contract.methods.getOrder().call();
        if (orderInfo['status'] == 0) {
            result = { info: orderInfo, balance: balance, name: name }
            orderResult.push(result);
        }

    }
    if (!orderResult || orderResult.length == 0) {
        res.render('empty-list-for-user', { medicals, supplies })
    }
    res.render('sold-order', {
        orderResult, me, medicals, supplies, page, limit
    });
})

const getContractDetail = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = req.user;
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let time = (new Date(contractDetail['createdAt'])).toString().slice(0, 24);
    let contract = await new web3.eth.Contract(abi, address);
    let balance = await contract.methods.getBalance().call();
    let orderInfo = await contract.methods.getOrder().call();
    if (!orderInfo) {
        res.status(404).render('error')
    }
    let seller = await UserService.getSeller(orderInfo.seller);
    res.render('order-detail', {
        orderInfo, me, seller, medicals, supplies, address, time
    });
})

const getSoldContractDetail = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const me = req.user;
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let time = (new Date(contractDetail['createdAt'])).toString().slice(0, 24);
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    if (!orderInfo) {
        res.status(404).render('error')
    }
    let buyer = await UserService.getBuyer(orderInfo.buyer);
    res.render('sold-order-detail', {
        orderInfo, me, buyer, medicals, supplies, address, time
    });
})

const confirmGivenMerchaindise = catchAsync(async (req, res, next) => {
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    await contract.methods.changeStatus('2').send({ from: orderInfo['buyer'] });
    res.status(200).json({
        success: true
    });
})

const confirmCompleted = catchAsync(async (req, res, next) => {
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    await contract.methods.changeStatus('4').send({ from: orderInfo['seller'] });
    res.status(200).json({
        success: true
    });
})

const confirmBySeller = catchAsync(async (req, res, next) => {
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    await contract.methods.changeStatus('1').send({ from: orderInfo['seller'] });
    res.status(200).json({
        success: true
    });
})

const cancelByBuyer = catchAsync(async (req, res, next) => {
    let merchaindise = await Merchaindise.findById(req.params.id);
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    merchaindise.quantity += parseInt(orderInfo['quantity']);
    merchaindise.soldQuantity -= parseInt(orderInfo['quantity']);
    merchaindise.save()
    await contract.methods.changeStatus('3').send({ from: orderInfo['buyer'] });
    res.status(200).json({
        success: true
    });
})

const cancelBySeller = catchAsync(async (req, res, next) => {
    let merchaindise = await Merchaindise.findById(req.params.id);
    const contractDetail = (await UserContractService.getContractDetail(req.params.address))[0];
    let abi = contractDetail['abi'];
    let address = contractDetail['contractAddress'];
    let contract = await new web3.eth.Contract(abi, address);
    let orderInfo = await contract.methods.getOrder().call();
    merchaindise.quantity += parseInt(orderInfo['quantity']);
    merchaindise.soldQuantity -= parseInt(orderInfo['quantity']);
    merchaindise.save()
    await contract.methods.changeStatus('3').send({ from: orderInfo['seller'] });
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
    confirmCompleted,
    confirmBySeller,
    cancelByBuyer,
    cancelBySeller,
    getNewContractBySeller
}
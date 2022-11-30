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
        console.log(11111, contract)
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

module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser
}
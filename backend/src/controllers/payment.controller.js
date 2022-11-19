const { createContractFile } = require('../utils/createContractFile');
const { deployContract } = require('../utils/deployContract');
const catchAsync = require('../utils/catchAsync');
const { Merchaindise, UserContract } = require('../models');
const Web3 = require("web3");

// Setting up a HttpProvider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const getPaymentForm = catchAsync(async (req, res, next) => {
    const merchaindise = await Merchaindise.findById(req.params.id)
    res.render('payment-form', { merchaindise })
})
const createAndDeployContract = catchAsync(async (req, res, next) => {
    let contractFileName = createContractFile(req.body);
    let walletAddress = req.user.walletAddress;
    await deployContract(contractFileName, walletAddress, req.user.id);
    // res.render('transaction')
    setTimeout(async () => {
        let userContract = (await UserContract.find().sort({ createdAt: -1 }))[0];
        let abi = userContract.abi;
        let address = userContract.contractAddress;
        let contract = await new web3.eth.Contract(abi, address);
        let fromAddress = req.user.walletAddress;
        let toAddress = (await Merchaindise.find({ slug: req.body.slug }).populate("owner"))[0].owner.walletAddress;
        let totalETH = req.body.quantity * req.body.unitPrice;
        res.render('transaction', { abi, address, fromAddress, toAddress, totalETH })
    }, 1500)


});

module.exports = {
    createAndDeployContract,
    getPaymentForm
}
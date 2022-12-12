const { createContractFile } = require('../utils/createContractFile');
const { deployContract } = require('../utils/deployContract');
const catchAsync = require('../utils/catchAsync');
const { Merchaindise, UserContract } = require('../models');
const { MerchaindiseService } = require('../services')
const Web3 = require("web3");

// Setting up a HttpProvider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const getPaymentForm = catchAsync(async (req, res, next) => {
    const merchaindise = await Merchaindise.findById(req.params.id).populate('owner');
    let buyerId = req.user.id;
    if (merchaindise.owner.id == buyerId) {
        res.render('self-buy');
        return
    }
    res.render('payment-form', { merchaindise, buyerId })
})
const createAndDeployContract = catchAsync(async (req, res, next) => {
    let buyerAddress = req.user.walletAddress;
    let sellerAddress = (await Merchaindise.find({ slug: req.body.slug }).populate("owner"))[0].owner.walletAddress;
    let sellerId = (await Merchaindise.find({ slug: req.body.slug }).populate("owner"))[0].owner.id;
    let merchaindiseId = req.body.id;
    req.body.buyerAddress = buyerAddress;
    req.body.sellerAddress = sellerAddress;
    MerchaindiseService.decreaseQuantity(req.body.slug, req.body.quantity);
    let contractFileName = createContractFile(req.body);
    // let walletAddress = req.user.walletAddress;
    await deployContract(contractFileName, buyerAddress, req.user.id, sellerId);
    // res.render('transaction')
    setTimeout(async () => {
        let userId = req.user.id;
        let userContract = (await UserContract.find().sort({ createdAt: -1 }))[0];
        let abi = userContract.abi;
        let address = userContract.contractAddress;
        let contract = await new web3.eth.Contract(abi, address);
        let fromAddress = req.user.walletAddress;
        let toAddress = (await Merchaindise.find({ slug: req.body.slug }).populate("owner"))[0].owner.walletAddress;
        let totalETH = req.body.quantity * req.body.unitPrice;
        res.render('transaction', { userId, abi, address, fromAddress, toAddress, totalETH, merchaindiseId })
    }, 2000)


});

module.exports = {
    createAndDeployContract,
    getPaymentForm
}
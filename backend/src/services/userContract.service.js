const { UserContract } = require('../models')

const getAbiByContractAddress = async (address) => {
    return (await UserContract.find({ contractAddress: address }))[0].abi;
}

const deleteUserContractByAddress = async (address) => {
    let userContract = (await UserContract.find({ contractAddress: address }))[0]
    userContract.isDeleted = true;
    userContract.save()
    return userContract;
}

const getContractByUser = async (userId) => {
    return await UserContract.find({ userId: userId }).sort('-createdAt').limit(10);
}

const getContractBySeller = async (sellerId) => {
    return await UserContract.find({ sellerId: sellerId }).sort('-createdAt').limit(10);
}

const getContractDetail = async (address) => {
    return await UserContract.find({ contractAddress: address });
}



module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser,
    getContractBySeller,
    getContractDetail,
}
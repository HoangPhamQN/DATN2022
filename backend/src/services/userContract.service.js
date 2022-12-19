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

const getContractByUser = async (userId, queryString) => {
    let queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    return await UserContract.find({ userId: userId }).sort('-createdAt').skip(skip).limit(limit);
}

const getContractBySeller = async (sellerId, queryString) => {
    let queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    return await UserContract.find({ sellerId: sellerId }).sort('-createdAt').skip(skip).limit(limit);
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
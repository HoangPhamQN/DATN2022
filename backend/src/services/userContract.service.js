const { UserContract } = require('../models')

const getAbiByContractAddress = async (address) => {
    return (await UserContract.find({ contractAddress: address }))[0].abi;
}

const deleteUserContractByAddress = async (address) => {
    await UserContract.deleteOne({ contractAddress: address });
}

const getContractByUser = async (userId) => {
    return await UserContract.find({ userId: userId }).sort('-createdAt');
}

const getContractBySeller = async (sellerId) => {
    return await UserContract.find({ sellerId: sellerId }).sort('-createdAt');
}

const getContractDetail = async (address) => {
    return await UserContract.find({ contractAddress: address });
}

const confirmGivenMerchainise = async (address) => {

}


module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser,
    getContractBySeller,
    getContractDetail
}
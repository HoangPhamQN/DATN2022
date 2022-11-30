const { UserContract } = require('../models')

const getAbiByContractAddress = async (address) => {
    return (await UserContract.find({ contractAddress: address }))[0].abi;
}

const deleteUserContractByAddress = async (address) => {
    await UserContract.deleteOne({ contractAddress: address });
}

const getContractByUser = async (userId) => {
    return await UserContract.find({ userId: userId }).sort('-createdAt').limit(5);
}

module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser
}
const { UserContract } = require('../models')

const getAbiByContractAddress = async (address) => {
    return (await UserContract.find({ contractAddress: address }))[0].abi;
}

module.exports = {
    getAbiByContractAddress
}
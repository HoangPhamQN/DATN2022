const { User } = require('../models')

const getMe = async (id) => {
    return await User.findById(id)
}

const getSeller = async (address) => {
    return (await User.find({ walletAddress: address }))[0]
}

const getBuyer = async (address) => {
    return (await User.find({ walletAddress: address }))[0]
}

module.exports = {
    getMe,
    getSeller,
    getBuyer
}
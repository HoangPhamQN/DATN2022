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

const listUser = async (queryString) => {
    // return (await User.find({ role: { $ne: "6350b3325bc8d1ddf91786cd" } }));
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const users = await User.find({ role: { $ne: "6350b3325bc8d1ddf91786cd" } }).skip(skip).limit(limit)
    return users
}

const getUserById = async (id) => {
    return (await User.findById(id))
}

module.exports = {
    getMe,
    getSeller,
    getBuyer,
    listUser,
    getUserById
}
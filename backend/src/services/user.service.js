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

const lockUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true })
}

const unlockUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true })
}

const deleteUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

const recoverUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
}

const addRoleSeller = async (id) => {
    return await User.findByIdAndUpdate(id, { role: "6350b3325bc8d1ddf91786cc" }, { new: true })
}

const removeRoleSeller = async (id) => {
    return await User.findByIdAndUpdate(id, { role: "6350b3325bc8d1ddf91786cb" }, { new: true })
}

module.exports = {
    getMe,
    getSeller,
    getBuyer,
    listUser,
    getUserById,
    lockUser,
    unlockUser,
    deleteUser,
    recoverUser,
    addRoleSeller,
    removeRoleSeller
}
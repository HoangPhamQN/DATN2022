const { User, Merchaindise } = require('../models')
const Web3 = require("web3");

// Setting up a HttpProvider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

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
    let queryObj = { ...queryString }
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
    let merchaindises = await Merchaindise.find({ owner: id });
    if (merchaindises.length != 0) {
        merchaindises.forEach(item => {
            item.isDeleted = true;
            item.save();
        })
    }
    return await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true })
}

const unlockUser = async (id) => {
    let merchaindises = await Merchaindise.find({ owner: id });
    if (merchaindises.length != 0) {
        merchaindises.forEach(item => {
            item.isDeleted = false;
            item.save();
        })
    }
    return await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true })
}

const deleteUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

const recoverUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
}

const addRoleSeller = async (id) => {
    let merchaindises = await Merchaindise.find({ owner: id });
    if (merchaindises.length != 0) {
        merchaindises.forEach(item => {
            item.isDeleted = false;
            item.save();
        })
    }
    return await User.findByIdAndUpdate(id, { role: "6350b3325bc8d1ddf91786cc" }, { new: true })
}

const removeRoleSeller = async (id) => {
    let merchaindises = await Merchaindise.find({ owner: id });
    merchaindises.forEach(item => {
        item.isDeleted = true;
        item.save();
    })
    return await User.findByIdAndUpdate(id, { role: "6350b3325bc8d1ddf91786cb" }, { new: true })
}

const checkBalance = async (id, num) => {
    const user = await User.findById(id);
    let address = user.walletAddress;
    let balance = await web3.utils.fromWei((await web3.eth.getBalance(address)).toString());
    let check;
    if (num > balance) {
        check = false
    } else check = true
    return check
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
    removeRoleSeller,
    checkBalance
}
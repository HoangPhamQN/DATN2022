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
    return await UserContract.find({ userId: userId }).sort('-createdAt');
}

const getContractBySeller = async (sellerId) => {
    return await UserContract.find({ sellerId: sellerId }).sort('-createdAt');
}

const getContractDetail = async (address) => {
    return await UserContract.find({ contractAddress: address });
}

// const autoCancelOrder = async () => {
//     let orders = await UserContract.find({ createdAt: { $lte: Date.now() - 1000 * 60 * 30 } })
//     if (orders) {
//         for (ele of orders) {
//             let abi = ele['abi'];
//             let address = ele['contractAddress'];
//             let contract = await new web3.eth.Contract(abi, address);
//             // let orderInfo = await contract.methods.getOrder().call();
//             await contract.methods.changeStatus('1').send({ from: orderInfo['buyer'] });
//         }
//     }
// }


module.exports = {
    getAbiByContractAddress,
    deleteUserContractByAddress,
    getContractByUser,
    getContractBySeller,
    getContractDetail,
}
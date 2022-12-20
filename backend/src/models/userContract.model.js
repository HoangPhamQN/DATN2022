const mongoose = require('mongoose');

const userContractSchema = mongoose.Schema({
    userId: {
        type: String
    },
    sellerId: {
        type: String
    },
    abi: {
        type: Array
    },
    contractAddress: {
        type: String
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false,
    // },
}, {
    timestamps: true,
});

const UserContract = mongoose.model('UserContract', userContractSchema);

module.exports = UserContract;
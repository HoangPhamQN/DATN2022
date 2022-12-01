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
}, {
    timestamps: true,
});

const UserContract = mongoose.model('UserContract', userContractSchema);

module.exports = UserContract;
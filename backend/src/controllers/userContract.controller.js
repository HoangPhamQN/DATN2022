const catchAsync = require("../utils/catchAsync");
const { UserContractService } = require("../services");

const getAbiByContractAddress = catchAsync(async (req, res, next) => {
    const abi = await UserContractService.getAbiByContractAddress(req.params.address);
    console.log("hihi", abi)
    res.json({
        status: 200,
        abi
    })
});

module.exports = {
    getAbiByContractAddress
}
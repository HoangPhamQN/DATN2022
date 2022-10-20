const catchAsync = require("../utils/catchAsync");
const { MerchaindiseService } = require("../services");

const getAllMerchaindise = catchAsync(async (req, res, next) => {
    const merchaindises = await MerchaindiseService.getAllMerchaindise();
    // if (!tours || tours.length === 0) {
    //     return next(new ApiError("Tour Not Found!", 404));
    // } else {
    //     res.status(200).json({
    //         status: 200,
    //         totalResult: tours.length,
    //         data: tours,
    //     });
    // }
    res.status(200).json({
        "data": merchaindises,
        "totalCount": merchaindises.length
    })
});

module.exports = {
    getAllMerchaindise
}
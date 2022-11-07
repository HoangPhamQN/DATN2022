const catchAsync = require('../utils/catchAsync')

const temp = catchAsync(async (req, res, next) => {
    console.log(req.user)
    res.status(200).send("Helloword")
})

module.exports = {
    temp
}
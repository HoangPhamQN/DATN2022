const catchAsync = require('./catchAsync')
const { Category } = require('../models')

const getCategoryName = async () => {
    const medicals = (await Category.find({ parent: '6368b3c573b35ed398290cbe' }).select('name')).map(item => {
        return item.name
    })
    console.log(44444, medicals)
    const supplies = (await Category.find({ parent: '6368b34e73b35ed398290cbd' }).select('name')).map(item => {
        return item.name
    })
    return { medicals, supplies }
}

module.exports = { getCategoryName }
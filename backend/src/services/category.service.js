const { Category, Merchaindise } = require("../models");

const getAllCategory = async (queryString) => {
    const result = []
    const categories = await Category.find({ parent: null })
    for (cate of categories) {
        subCates = await Category.find({ parent: cate._id })
        obj = {
            category: cate,
            subCategory: {
                data: subCates,
                totalCont: subCates.length
            }
        }
        result.push(obj)
    }
    return result
}

const getSubCate = async (parentId) => {
    const subCates = await Category.find({ parent: parentId })
    return subCates
}

const getSubCateMerchaindise = async (id) => {
    const merchaindises = await Merchaindise.find({ category: id })
    return merchaindises
}

module.exports = {
    getAllCategory,
    getSubCate,
    getSubCateMerchaindise
}
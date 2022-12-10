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

const manageCategory = async (queryString) => {
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const cates = await Category.find({ parent: { $ne: null } }).skip(skip).limit(limit)
    return cates
}

const getDetailCate = async (id) => {
    return await Category.findById(id)
}

const getAllSubCate = async () => {
    return await Category.find({ parent: { $ne: null } })
}

module.exports = {
    getAllCategory,
    getSubCate,
    getSubCateMerchaindise,
    manageCategory,
    getDetailCate,
    getAllSubCate
}
const { Merchaindise, Category } = require("../models");
const CustomQuery = require('../utils/customQuery')

const getAllMerchaindise = async (queryString) => {
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const merchaindises = await Merchaindise.find().skip(skip).limit(limit)
    return merchaindises
}

const getDetail = async (id) => {
    const merchaindise = await Merchaindise.findById(id).populate("owner category").find({ isDeleted: false })
    return merchaindise
}

const deleteMerchaindise = async (id) => {
    const updatedMerchaindise = await Merchaindise.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    })
    return updatedMerchaindise;
};

const createMerchaindise = async (body) => {
    const newMerchaindise = await Merchaindise.create({
        name: body.name,
        registrationCode: body.registrationCode,
        description: body.description,
        imageAvatar: body.imageAvatar,
        images: body.images,
        unitPrice: body.unitPrice,
        quantity: body.quantity,
        unit: body.unit,
        owner: body.owner,
        category: body.category
    })

    return newMerchaindise
}

const updateMerchaindise = async (id, body) => {
    const updatedMerchaindise = await Merchaindise.findByIdAndUpdate(id, body, {
        new: true,
    })
    return updatedMerchaindise;
}

const getMedicalSupplies = async () => {
    let result = []
    let medical2Trees = []
    let medical1Trees = await Category.find({ treeId: 1, parent: "6368b34e73b35ed398290cbd" })
    for (item of medical1Trees) {
        let medical2Tree = await Category.find({ treeId: 2, parent: item._id })
        medical2Trees = medical2Trees.concat(medical2Tree)
    }
    for (item of medical2Trees) {
        let merchaindise = await Merchaindise.find({ category: { $eq: item._id } }).populate("category")
        result = result.concat(merchaindise)
    }
    return result
}

const getMerchaindiseByCategory = async (slug) => {
    // const cateId = await Category.find({ id: { $eq: '634edd45dc378e9fcbcefb20' } })[0]
    const cateId = (await Category.findOne({ slug: slug })).id
    const result = await Merchaindise.find({ category: cateId })
    return result
}

const getMerchaindiseByOwner = async (id) => {
    return await Merchaindise.find({ owner: id, isDeleted: false }).sort('-createdAt');
}

module.exports = {
    getAllMerchaindise,
    getDetail,
    deleteMerchaindise,
    createMerchaindise,
    updateMerchaindise,
    getMedicalSupplies,
    getMerchaindiseByCategory,
    getMerchaindiseByOwner
}
const { Merchaindise } = require("../models");
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
    const merchaindise = await Merchaindise.findById(id)
    return merchaindise
}

const deleteMerchaindise = async (id) => {
    const rs = await Merchaindise.deleteOne({ _id: id });
    return rs.deletedCount;
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

module.exports = {
    getAllMerchaindise,
    getDetail,
    deleteMerchaindise,
    createMerchaindise,
    updateMerchaindise
}
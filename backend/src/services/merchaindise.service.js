const { Merchaindise, Category } = require("../models");
const CustomQuery = require('../utils/customQuery')

const getAllMerchaindise = async (queryString) => {
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const merchaindises = await Merchaindise.find({ isDeleted: false }).skip(skip).limit(limit).sort('-createdAt')
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
    let slug = body.name;
    slug = slug.toLowerCase();

    // xóa dấu
    slug = slug
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    slug = slug.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    slug = slug.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    slug = slug.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    slug = slug.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    slug = slug.replace(/^-+|-+$/g, '');
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
        category: body.category,
        slug: slug
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

const getMerchaindiseByCategory = async (slug, queryString) => {
    // const cateId = await Category.find({ id: { $eq: '634edd45dc378e9fcbcefb20' } })[0]
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const cateId = (await Category.findOne({ slug: slug })).id

    const cate = await Category.findById(cateId);
    const merchaindises = await Merchaindise.find({ category: cateId, isDeleted: false }).sort('-createdAt').skip(skip).limit(limit)
    return { merchaindises, cate }
}

const getMerchaindiseByOwner = async (id, queryString) => {
    queryObj = { ...queryString }
    const page = queryObj.page * 1 || 1;
    const limit = queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    return await Merchaindise.find({ owner: id, isDeleted: false }).sort('-createdAt').skip(skip).limit(limit);
}

const checkExistQuantity = async (quantity, slug) => {
    const merchaindiseQuantity = (await Merchaindise.find({ slug: slug }))[0].quantity;
    let check, num;
    if (quantity <= merchaindiseQuantity) {
        check = true;
        num = quantity
    } else {
        check = false;
        num = merchaindiseQuantity
    }
    return { check, num };
}

const decreaseQuantity = async (slug, quantity) => {
    const merchaindise = (await Merchaindise.find({ slug: slug }))[0];
    merchaindise.quantity -= parseInt(quantity);
    merchaindise.soldQuantity += parseInt(quantity);
    merchaindise.save()
}

module.exports = {
    getAllMerchaindise,
    getDetail,
    deleteMerchaindise,
    createMerchaindise,
    updateMerchaindise,
    getMedicalSupplies,
    getMerchaindiseByCategory,
    getMerchaindiseByOwner,
    checkExistQuantity,
    decreaseQuantity
}
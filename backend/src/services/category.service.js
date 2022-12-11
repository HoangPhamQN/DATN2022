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

const updateCategory = async (id, body) => {
    let cate = await Category.findById(id)
    cate.name = body.name;
    body.name = body.name.toLowerCase();

    // xóa dấu
    body.name = body.name
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    body.name = body.name.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    body.name = body.name.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    body.name = body.name.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    body.name = body.name.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    body.name = body.name.replace(/^-+|-+$/g, '');
    cate.slug = body.name;
    cate.save()
    return cate;

}

const getParentCate = async () => {
    return Category.find({ parent: null })
}

const createCate = async (body) => {
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
    const newCate = await Category.create({
        name: body.name,
        parent: body.parent,
        slug: slug,
        treeId: 1
    })

    return newCate
}

const deleteCate = async (id) => {
    let thuocKhacId = (await Category.findById("63954171df9782973265223e")).id
    let vatTuKhacId = (await Category.findById("63954191df9782973265223f")).id
    let merchaindises = await Merchaindise.find({ category: id });
    let cate = await Category.findById(id);
    if (cate.parent == "6368b3c573b35ed398290cbe") {
        merchaindises.forEach(item => {
            item.category = thuocKhacId;
            item.save()
        })
    } else {
        merchaindises.forEach(item => {
            item.category = vatTuKhacId;
            item.save()
        })
    }
    cate.isDeleted = true;
    cate.save()
    return cate
}

module.exports = {
    getAllCategory,
    getSubCate,
    getSubCateMerchaindise,
    manageCategory,
    getDetailCate,
    getAllSubCate,
    updateCategory,
    getParentCate,
    createCate,
    deleteCate
}
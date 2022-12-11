const { CategoryService } = require('../services');
const { getCategoryName } = require('../utils/category')
const units = require('../configs/unit')
const getLoginForm = async (req, res) => {
    const { medicals, supplies } = await getCategoryName()
    res.status(200).render('login', {
        title: 'Đăng nhập',
        medicals,
        supplies
    });
};

const getSignUpForm = async (req, res) => {
    const { medicals, supplies } = await getCategoryName()
    res.status(200).render('signup', {
        title: 'Đăng ký tài khoản',
        medicals,
        supplies
    });
};

const getCreateMerchaindiseForm = async (req, res) => {
    const { medicals, supplies } = await getCategoryName();
    const categories = await CategoryService.getAllSubCate();
    res.status(200).render('merchaindise-create', {
        medicals,
        supplies,
        categories,
        units
    })
}

const getCreateCategoryForm = (async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName();
    const parents = await CategoryService.getParentCate();
    res.status(200).render('add-cate', {
        medicals,
        supplies,
        parents
    })

})

module.exports = {
    getLoginForm,
    getSignUpForm,
    getCreateMerchaindiseForm,
    getCreateCategoryForm
}
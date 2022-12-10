const { getCategoryName } = require('../utils/category')
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

module.exports = {
    getLoginForm,
    getSignUpForm
}
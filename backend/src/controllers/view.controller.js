const getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Login into your account'
    });
};

module.exports = {
    getLoginForm
}
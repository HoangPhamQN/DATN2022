const { User } = require('../models')

const getMe = async (id) => {
    return await User.findById(id)
}

module.exports = {
    getMe
}
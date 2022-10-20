const { Merchaindise } = require("../models");

const getAllMerchaindise = async () => {
    return await Merchaindise.find();
}

module.exports = {
    getAllMerchaindise
}
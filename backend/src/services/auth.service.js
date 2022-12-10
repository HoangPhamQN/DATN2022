const { User } = require('../models')

const signUp = async (body) => {
    let existedEmail = await User.find({ email: body.email });
    let existedPhoneNumber = await User.find({ phoneNumber: body.phoneNumber });
    let existedWalletAddress = await User.find({ walletAddress: body.walletAddress });
    if (existedEmail.length > 0) {
        let data = "Email";
        return { data: data };
    } else if (existedPhoneNumber.length > 0) {
        let data = "Số điện thoại";
        return { data: data };
    } else if (existedWalletAddress.length > 0) {
        let data = "Địa chỉ ví";
        return { data: data };
    }
    const newUser = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
        address: body.address,
        role: "6350b3325bc8d1ddf91786cb",
        walletAddress: body.walletAddress,
        photoUrl: body.photoUrl
    });
    return newUser
}

module.exports = {
    signUp
}
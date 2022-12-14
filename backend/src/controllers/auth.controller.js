const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');
const { getCategoryName } = require('../utils/category');
const { AuthService } = require('../services');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('jwt', token, cookieOption);
    if (user.role.toString() == "6350b3325bc8d1ddf91786cd") {
        res.redirect('/user/admin')
    }
    else {
        res.redirect('/hang-hoa/tat-ca-mat-hang?page=1&limit=3')
    }
};

const signup = catchAsync(async (req, res, next) => {
    const photoUrl = req.files.photoUrl[0].path;
    const body = Object.assign(
        req.body,
        { photoUrl: photoUrl }
    );
    console.log(body.address)
    const result = await AuthService.signUp(body);
    let data = result.data;
    if (data) {
        res.render('existed-user', { data })
        return
    }
    createAndSendToken(result, 201, res);
});

const login = catchAsync(async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    const { email, password } = req.body;
    if (!email || !password) {
        // return next(new AppError('Please provide email and password', 400));
        res.render('not-enough-email-pass', { medicals, supplies })
        return
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        // return next(new AppError('Incorrect email or password!', 401));
        res.render('incorrect-login')
        return
    }
    const correct = await user.correctPassword(password, user.password);

    if (!correct) {
        // return next(new AppError('Incorrect email or password!', 401));
        res.render('incorrect-login', { medicals, supplies })
        return
    }

    if (user.isBlocked == true) {
        res.render('locked-user', { medicals, supplies });
        return
    }

    if (user.isDeleted == true) {
        res.render('deleted-user', { medicals, supplies });
        return
    }
    createAndSendToken(user, 200, res);
});

const logout = catchAsync(async (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

const protect = catchAsync(async (req, res, next) => {
    // const url = req.originalUrl
    // 1) get the token and check if it there
    let token;
    const { medicals, supplies } = await getCategoryName()

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // console.log(req.cookies.jwt);
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        // return next(
        //     new AppError('You are not login! Please login to get access', 401)
        // );
        // res.send('<script>alert("Vui l??ng ????ng nh???p ????? truy c???p t??i nguy??n n??y!"); window.location.href = "/auth/login"; </script>');
        res.render('login_require', { medicals, supplies })
        return
    }
    // 2) verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The token belonging to this user does no longer exist', 401)
        );
    }
    if (currentUser.isBlocked == true) {
        res.render('locked-user', { medicals, supplies });
        return;
    }

    if (currentUser.isDeleted == true) {
        res.render('deleted-user', { medicals, supplies });
        return
    }
    res.locals.user = currentUser;
    req.user = currentUser;
    next();
});

const isLoggedIn = async (req, res, next) => {
    // get the token and check if it there
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

const restrictTo = (...roles) => {
    return async (req, res, next) => {
        // role [admin, lead-guide]
        userRole = (await Role.findById(req.user.role)).name
        if (!roles.includes(userRole)) {
            return next(
                new AppError('You do not have permission to perform that action', 403)
            );
        }

        next();
    };
};

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//     //1 Get user based on posted email
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         return next(new AppError('There is no user with that email!', 404));
//     }
//     // 2 generate random token
//     const resetToken = user.createPasswordResetToken();
//     user.save({ validateBeforeSave: false });
//     // send it back to user email
//     const resetURL = `${req.protocol}://${req.get(
//         'host'
//     )}/api/v1/users/resetPassword/${resetToken}`;

//     const message = `Forgot your password, submit a patch request with your new pass word and password confirm to ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
//     try {
//         // await sendEmail({
//         //   email: user.email,
//         //   subject: 'Your password reset token (valid in 10 mins)',
//         //   message
//         // });

//         res.status(200).json({
//             status: 'success',
//             message: 'token send to email!'
//         });
//     } catch (error) {
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         user.save({ validateBeforeSave: false });

//         return next(
//             new AppError(
//                 'There was an error sending the email. Try again later!',
//                 500
//             )
//         );
//     }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//     //1 get user base on the token
//     const hashedToken = crypto
//         .createHash('sha256')
//         .update(req.params.token)
//         .digest('hex');

//     const user = await User.findOne({
//         passwordResetToken: hashedToken,
//         passwordResetExpires: { $gt: Date.now() }
//     });
//     // if token has not expired and there is user, set new pass
//     if (!user) {
//         return next(new AppError('Token is invalid or has expired', 400));
//     }
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();
//     // update pass

//     // log the user in, send jwt to client
//     createAndSendToken(user, 200, res);
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//     // get user from the colection
//     const user = await User.findById(req.user.id).select('+password');
//     // check if posted current pass is correct
//     if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//         return next(new AppError('Your current password is wrong', 401));
//     }

//     // update the pass
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     await user.save();

//     // log user in, send jwt
//     createAndSendToken(user, 200, res);
// });

module.exports = {
    signup,
    login,
    protect,
    restrictTo,
    logout,
    isLoggedIn
}

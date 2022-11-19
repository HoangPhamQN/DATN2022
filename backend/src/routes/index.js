const express = require("express");
const { getCategoryName } = require('../utils/category')

const MerchaindiseRoute = require("./merchaindise.route");
const CategoryRoute = require("./category.route");
const AuthRoute = require("./auth.route");
const UserRoute = require("./user.route");
const PaymentRoute = require("./payment.route");
const UserContractRoute = require("./userContract.route");

const router = express.Router();

const defaultRoutes = [
    {
        path: "/hang-hoa",
        route: MerchaindiseRoute,
    },
    {
        path: "/category",
        route: CategoryRoute,
    },
    {
        path: '/auth',
        route: AuthRoute
    },
    {
        path: '/user',
        route: UserRoute
    },
    {
        path: '/payment',
        route: PaymentRoute
    },
    {
        path: '/user-contract',
        route: UserContractRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

router.use("/", async (req, res, next) => {
    const { medicals, supplies } = await getCategoryName()
    res.render('bg', { medicals, supplies })
})

module.exports = router;

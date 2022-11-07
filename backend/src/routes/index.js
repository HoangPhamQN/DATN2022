const express = require("express");

const MerchaindiseRoute = require("./merchaindise.route");
const CategoryRoute = require("./category.route");
const AuthRoute = require("./auth.route");

const router = express.Router();

const defaultRoutes = [
    {
        path: "/merchaindise",
        route: MerchaindiseRoute,
    },
    {
        path: "/category",
        route: CategoryRoute,
    },
    {
        path: '/auth',
        route: AuthRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

router.use("/", (req, res, next) => {
    res.render('bg')
})

module.exports = router;

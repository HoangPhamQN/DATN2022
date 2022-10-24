const express = require("express");

const MerchaindiseRoute = require("./merchaindise.route");
const CategoryRoute = require("./category.route");

const router = express.Router();

const defaultRoutes = [
    {
        path: "/merchaindise",
        route: MerchaindiseRoute,
    },
    {
        path: "/category",
        route: CategoryRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;

const express = require("express");

const MerchaindiseRoute = require("./merchaindise.route");

const router = express.Router();

const defaultRoutes = [
    {
        path: "/merchaindise",
        route: MerchaindiseRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;

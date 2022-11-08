require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const port = process.env.PORT || 4000;
const connectDatabase = require('./configs/database.config')
connectDatabase.connect()

const routes = require("./routes");
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cookieSession({ name: "session", keys: ["DATN"], maxAge: 10 })
);

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/", routes);
app.use((err, req, res, next) => {
    if (!err.statusCode) {
        console.log(err)
        res.status(500).json({
            title: "Some thing went wrong, please check your console!",
            message: err.message
        })
    }
    res.status(err.statusCode).json({
        title: "Some thing went wrong!",
        message: err.message
    })
})

app.listen(port, () => console.log(`server is running in port ${port}`));
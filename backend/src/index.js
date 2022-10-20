require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 4000;
const connectDatabase = require('./configs/database.config')
connectDatabase.connect()

const routes = require("./routes");
const app = express();


app.use("/", routes);

app.listen(port, () => console.log(`server is running in port ${port}`));
require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 4000;
const connectDatabase = require('./configs/database.config')
connectDatabase.connect()

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log(`server is running in port ${port}`));
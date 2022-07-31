const express = require('express');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config({path : "server/config/config.env"});


const userRoute = require('./routes/userRoutes');

app.use("/api/v1", userRoute);


module.exports = app;

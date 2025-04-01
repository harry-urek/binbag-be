const express = require("express");
const { json, urlencoded } = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use([json(), urlencoded({ extended: true })]);
app.use("/user", userRoutes);
module.exports = app;

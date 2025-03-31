const express = require("express");
const { json, urlencoded } = require("body-parser");

const app = express();

// Middlewares
app.use([json(), urlencoded({ extended: true })]);

module.exports = app;

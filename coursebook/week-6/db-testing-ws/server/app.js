const express = require("express");
const { join } = require("path");
const router = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "..", "public")));

app.set("port", process.env.PORT || 5000);

app.use(router);

module.exports = app;

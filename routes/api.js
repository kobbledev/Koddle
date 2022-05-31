const express = require("express");
const userRouter = require("./userRouter");
const app = express();

app.use("/v1/user/", userRouter);

module.exports = app;
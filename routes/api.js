const express = require("express");
const userRouter = require("./userRouter");
const cardRouter = require("./cardRouter");
const app = express();

app.use("/v1/user/", userRouter);
app.use("/v1/card/",cardRouter)

module.exports = app;
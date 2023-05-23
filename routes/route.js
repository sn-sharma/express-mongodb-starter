var express = require("express");
var usersRouter = require("./users");
var authRouter = require("./auth");

var route = express();

route.use("/api/v1/users", usersRouter);
route.use("/api/v1/auth", authRouter);

module.exports = route;

const express = require("express");
const { register, userVerification, login } = require("../controler/user.Controller");
const route = express.Router();

route.post("/user/register",register)
route.post("/user/verification",userVerification);
route.post("/user/login", login)



module.exports = route ;
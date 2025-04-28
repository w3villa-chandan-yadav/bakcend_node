const express = require("express");
const { paymentCachup, verifyingPayment } = require("../controler/paymnet.Controller");
const paymentRoute = express.Router();


paymentRoute.post("/createPayment", paymentCachup)
paymentRoute.post("/verify", verifyingPayment)



module.exports = { paymentRoute }
import express from "express";
import { createUser, UserTest } from "../controller/user.controller.js";
const route = express.Router();


route.get('/userLogin',UserTest)

route.post("/createUser",createUser)



export default route;
import express from "express";
import { userLogin } from "../contrller/user.Controller.js";
const route = express.Router();

route.get("/login",userLogin)


export default route

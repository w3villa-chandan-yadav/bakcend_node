import express from "express";
import { homePage, UpdateProducts } from "../controller/redis.controller.js";
const route = express.Router();


route.get("/home",homePage);
route.post("/update", UpdateProducts)


export default route 
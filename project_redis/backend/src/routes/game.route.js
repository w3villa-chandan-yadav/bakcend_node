import express from "express";
import { createGames, generateQuestion, getAllGames } from "../controller/game.controller.js";
import { isLoginUser } from "../middelwares/authenticate.user.js";
const route = express.Router();


route.post("/create", isLoginUser ,createGames);
route.get("/allGames", isLoginUser, getAllGames);

route.post("/questions", isLoginUser, generateQuestion )







export default route

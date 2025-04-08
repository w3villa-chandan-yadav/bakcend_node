import express from "express";
import { EmailVerificationcheck, loginUser, PhoneNumberSmsVerification, phoneNumberVerification, signUp } from "../controller/user.controller.js";
import { createGameWithUser, getPlayerdetails, getPlayerincreamentScores } from "../controller/game.controller.js";
import { isLoginUser } from "../middelwares/authenticate.user.js";
const route = express.Router();


route.post("/signUp", signUp);
route.post("/login", loginUser);
route.post('/emailverify',EmailVerificationcheck)
route.post("/phone", isLoginUser, phoneNumberVerification);
route.post("/phoneverification",isLoginUser,PhoneNumberSmsVerification)



/////--------------------------////////////////
route.post("/game",createGameWithUser);
route.post("/game/player",getPlayerdetails);
route.post("/game/score",getPlayerincreamentScores);


export default route
import User from "../models/user.model.js"
import { nativeQuery } from "../native/native.js"
import queryies from "../native/rawQuerey.json" assert { type: 'json' };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Games from "../models/games.model.js";
import Participant from "../models/participant.model.js";
import { sendMailAuthentication } from "../config/nodemailer.js";
import { getToken, hashToken } from "../config/createHash.js";
import { EmailVerification } from "../models/emailLogin.model.js";
import { PhoneVerification } from "../models/phoneNumberverification.model.js";
import client from "../config/redisConnection.js";
import { ApiError } from "../middelwares/error.middleware.js";
import { ERRORSTACKS } from "../constant.js/error.constant.js";

const signUp = async(req,res , next )=>{
    try {
        const {name, email, password } = req.body;

        if(!name || ! email || !password ){
            return  next(new ApiError(400, ERRORSTACKS.USERERROR.INSUFFIENTDATA))
            
        }

        const isExistingUser = await User.findOne({ where: {email: email}})
        if(isExistingUser){
           return  res.status(400).json({
                success: "false",
                message: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt);
    
        const newUser = await User.create({
            userName: name,
            email: email,
            password: newPassword
        })

        console.log(newUser)

        const token =  getToken();

        const getHastoken =  hashToken(token); 
        

        await sendMailAuthentication(email, `http://localhost:5173/emailverification/${token}`)


        const userId = newUser.dataValues.id ;

        await EmailVerification.create({
          token: getHastoken,
          userId: userId,  
        })

        await client.setEx(getHastoken, 300, "token")

        return res.status(200).json({
            success: true,
            message: "Email send successfuly",
            data: token
        })
    } catch (error) {
        console.log("error in signup", error)
        next(new ApiError(404,"error in user model "))
    }
}

const EmailVerificationcheck =async (req, res, next )=>{
    try {
        const { token } = req.body;

        if(!token){
            return next(new ApiError(400, ERRORSTACKS.USERERROR.INSUFFIENTDATA))
        }

        const gethashtoken =  hashToken(token);

        console.log(gethashtoken)

        const redisToken = await client.get(gethashtoken);

        if(!redisToken){

            res.status(200).json({
                success: false,
                message: "token expires",
                data: []
            })

        }


        const isUser = await nativeQuery(queryies.getLatestEmail,[ gethashtoken])

        if(isUser.length < 1){
            return res.status(400).json({
                success: false,
                message: "token expires",
                data: []
            })
        }

        console.log( isUser[0].userId );

        // console.log(new Date(Date.now()))
        // console.log(new Date(isUser[0].expiresAt))
        // console.log(Date.now()<new Date(isUser[0].expiresAt))

        if(Date.now() > new Date(isUser[0].expiresAt)){
            res.status(200).json({
                success: false,
                message: "Token has expired"
            })
        }

        await User.update({
            nextStep: "2"
        },{
            where:{
                 id: isUser[0].userId 
            },
        })

        await EmailVerification.destroy({
            where:{
                userId: isUser[0].userId
            }
        })

        res.status(200).json({
            success: true,
            message: "Email verification"
        })

    } catch (error) {
        console.log("error in the Emailverificationcheck", error);
          next( new Error("error in the Emailverificationchec"))
    }
}

const PhoneNumberSmsVerification = async (req , res, next)=>{
    try {
        
        // const t = User.sequelize.transaction({
        //     isolationLevel:
        // })

        const { otp } = req.body ;

        const result = await nativeQuery(queryies.getLatestOpt, [otp]);

        if(result[0].length < 1){
            return res.status(400).json({
                success: false,
                message: "Otp expired"
            })
        }

        if(Number(result[0].nextStep) > 2){
            return res.status(400).json({
                success: false,
                message: "Phone Number Already verified"
            })
        }

        if(Date.now() > new Date(result[0].epxireAt)){
            return res.status(400).json({
                success: false,
                message: "Otp expired"
            })
        }

        await User.update({
            nextStep : "3",
        },{
            where:{
                id: result[0].id
            },
        })

        await PhoneVerification.destroy({
            where:{
                userId: result[0].id
            },
        })

        return res.status(200).json({
            success: true,
            message: "Phone number verified"
        })
        
    } catch (error) {
        console.log("error in the phoneNumberSmsVerification route");
        next(new Error("error in the phoneNumberSmsVerifcation route"))
    }
}


const phoneNumberVerification = async ( req , res , next )=>{
    try {
        
        const { phoneNumbers } = req.body ;
        const numbers = "1234567890";
        let otp =""
        for(let i =0 ; i < 6 ; i++){
            let char = numbers[Math.round(Math.random()*numbers.length)]
            otp +=char
        }
        const isUser = await User.findOne({
            where:{
                uuid : req.user.uuid
            }
        })
        if(Number(isUser.dataValues.nextStep) > 2){
            res.status(400).json({
                success: false,
                message: "Already verified"
            })
        }

        await User.update({
            phoneNumber: phoneNumbers,
        },
        {
            where:{
                id: isUser.dataValues.id
            }
     } )

     await PhoneVerification.create({
        userId: isUser.dataValues.id,
        verificationCode: Number(otp)
     })



        res.status(200).json({
            success: true,
            message: "otp send successfully"
        })
    } catch (error) {
        console.log("error in phoneNumber verifcation",error);
        next(new Error("error in phoneNumber verification"))

    }
}


const loginUser = async(req,res , next )=>{
    try {
        const { email, password } = req.body 

        const isExistingUser = await User.findOne({ where: { email: email } })

        if(!isExistingUser){
            return res.status(400).json({
                success:false,
                message:"Please enter a valid email/password"
            })
        }

        if(isExistingUser.dataValues.nextStep === "1"){
            return res.status(200).json({
                success: true,
                message: "on first step verificaiton",
                redirect: "http://localhost:5173/verification?step=1"
            })
        }

        const isCorrectPassword = await bcrypt.compare(password, isExistingUser.password )
        if(!isCorrectPassword){
            return res.status(400).json({
                success:false,
                message:"Please enter a valid email/password"
            })
        }
        delete isExistingUser.dataValues.password;
        delete isExistingUser.dataValues.id;
        const token = await jwt.sign(isExistingUser.dataValues,process.env.JWT_SECRET,{
            expiresIn:"24h"
        })
       console.log(token);

        return res.cookie("token", token).status(200).json({
            success:true,
            message:"Login succcessfully",
            user:isExistingUser
        })
        
    } catch (error) {
        console.log("error in the loginUser controller");
     next(new Error("Error in the loginUser controller"));
    }
}




export {signUp, loginUser , phoneNumberVerification , EmailVerificationcheck,  PhoneNumberSmsVerification}
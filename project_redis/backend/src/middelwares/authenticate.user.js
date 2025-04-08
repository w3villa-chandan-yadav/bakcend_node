import jwt from "jsonwebtoken";
import User from "../models/user.model.js";



const isLoginUser = async( req , res , next )=>{
    try {
        
        // console.log(req.cookies)

        const token =   req.cookies.token || req.body.token || req.header("token").replace("Bearer ","") ;

        if(!token){
            res.status(403).json({
                success: false,
                message: "please provide"
            })
        }

        // console.log(token);

        const decode = await jwt.verify(token, process.env.JWT_SECRET) ;

        // console.log(decode)

        req.user = decode ;
        
        
          next()
    } catch (error) {
        
        console.log("error in the user authentication middleware", error)
        next(new Error("This error is occured in the isLoginUsers"))
    }
}


export { isLoginUser }
const { ERRORS } = require("../constants/error.Constant");
const { verifyJwttoken } = require("../service/jwtservice");
const { ApiError } = require("./error.Middleware");


const isValidUser = async (req, res, next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header("Authentication");

        console.log(token)

        if(!token){
            return next(new ApiError(401, ERRORS.USERERROR.INVALIDTOKEN))
        }

        let decode ;

        try {
             decode = await verifyJwttoken(token)
        } catch (error) {
            throw new Error("jwt verifying error")
        }
        req.user = decode ;
        next()
        
    } catch (error) {
        console.log("error in validating user",error);

        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
} 


module.exports = { isValidUser  }
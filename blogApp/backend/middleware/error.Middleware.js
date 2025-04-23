const { ERRORS } = require("../constants/error.Constant");

class ApiError extends Error{
    constructor(statusCode, message, data= []){
     super(message);
     this.statusCode= statusCode;
     this.data= data
    }
}

const errorhandler = async (err, req, res, next)=>{
    try {
        const {statusCode, message, data }= err;
 
        res.status(statusCode ?? 400).json({
            success: false,
            message: message || ERRORS.SERVERERROR.INTERNALERROR,
            data: data
        })


    } catch (error) {
        console.log("error in error middleware",error)
    }
}


module.exports = { ApiError, errorhandler }
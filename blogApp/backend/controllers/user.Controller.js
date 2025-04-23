const { ERRORS } = require("../constants/error.Constant");
const { userSchema, userLogin } = require("../dto/user.dto");
const { ApiError } = require("../middleware/error.Middleware");
const { userModel } = require("../models/user.Model");
const { generateBcryptPassword, checkBcryptPassword } = require("../service/bcryptlib");
const { generateJwttoken } = require("../service/jwtservice");

const registerUser = async (req, res, next)=>{
    try {
        
        const { error } = userSchema.validate(req.body);

        if(error){
            console.log(error)
            return next(new ApiError(400, error.details[0].message))
        }
        const {email, password, name }= req.body ;
        const isUser = await userModel.findOne({
            where: {
                email: email
            }
        });
        if(isUser){
            return next(new ApiError(400, ERRORS.USERERROR.ALLREADYUSER ))
        }

        const newPassword = await generateBcryptPassword(password)

        const newuser = await userModel.create({
            name: name,
            email: email,
            password: newPassword
        })

        // console.log(newuser)

        res.status(201).json({
            success: true,
            message: "user register successfuly",
            data: []
        })

    } catch (error) {
        console.log("errror in registerUser", error);
        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}


const loginUser = async (req, res, next)=>{
    try {
        
        const { error } = userLogin.validate(req.body)

        if(error){
         return   next(new ApiError(400, ERRORS.USERERROR.ALLFIELDSREQUIRED))
        }

        const {email, password } = req.body ;

        const isUser = await userModel.findOne({
            where:{
                email: email
            }
        })

        if(!isUser){
            return  next(new ApiError(401, ERRORS.USERERROR.CREADIENTALERROR))
        }

        const isCorrectPassword = await checkBcryptPassword(password, isUser.dataValues.password)

        if(!isCorrectPassword){
            return next(new ApiError(401, ERRORS.USERERROR.CREADIENTALERROR))
        };

        const token = await generateJwttoken({id:isUser.dataValues.id, email: isUser.dataValues.email})

        res.cookie("token",token).status(200).json({
            success: true,
            message: "user login successfully",
            data:{token, ...isUser.dataValues, password: null}
        })

    } catch (error) {
        console.log("error in loginUser",error);
        next(new ApiError(5000, ERRORS.SERVERERROR.INTERNALERROR ))
    }
}




module.exports = { registerUser, loginUser }
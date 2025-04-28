const { sendMail } = require("../config/mail.config")
const { USERERRORS, SERVER } = require("../constant/error.constant")
const { PATHS } = require("../constant/path.constant")
const { userRegistrationSchema, userVerificationSchema, userLoginSchema } = require("../dto/user.dto")
const { ApiError } = require("../middleware/error.Middleware")
const { commentModels } = require("../modles/comment.Models")
const { emailModel } = require("../modles/emailVerification.Model")
const { userModel } = require("../modles/user.Models")
const { NATIVEQUERIES } = require("../sequle/nativeQueries")
const { rawSqlExecquation } = require("../sequle/rawSql")
const { generateJwtToken } = require("../utils/generateJwt")
const { generateToken } = require("../utils/generateToken")
const { getPasswordHash, checkPassword } = require("../utils/hashPassword")



// const result = await rawSqlExecquation(NATIVEQUERIES.FETCHALLUSER)
// await sendMail("chandankumaryadav544@gmail.com", "subject ", "chadnan" ,"http://localhost:4000") 




// -------------------------------user register-------------------------------//
exports.register = async ( req , res , next )=>{
    try {
        console.log(req.originalUrl)
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        
        const { error } = userRegistrationSchema.validate(req.body);    
        if(error){
            console.log(error)
            return next(new ApiError(401,USERERRORS.LOGINERROR.INSUFFICIENT))
        }

        const { name, email, password } = req.body ;
     

        const existingUser = await userModel.findOne({
            where:{
                email: email
            }
        })

       if(existingUser){
          return  next(new ApiError(400, USERERRORS.LOGINERROR.ALREADYUSER))
       }

       const newPassword = await getPasswordHash(password);
       
       console.log(newPassword,"................................>>>...........")

       const verificationToken = await generateToken()

       const newUser = await userModel.create({name , email , password: newPassword })

       console.log(newUser)

       await emailModel.create({ userId: newUser.dataValues.id , token: verificationToken})

      let link = ""

      if(`${req.protocol}://${req.get('host')}` === PATHS.CHECKER.LOCALSERVER ){
        link = `${PATHS.SENDER.LOCALSERVER}${verificationToken}`
      }else{
        link = `${PATHS.SENDER.SERVER}${verificationToken}`
      }
       
       const mailResult = await sendMail(email, "Activation link", name, link);

        res.status(200).json({
            success: true,
            message: 'Please check email and verify the link',
            data: []
        })

    } catch (error) {
        console.log("error in registering", error)
        next(new ApiError(500,SERVER.INTERNALERROR))
    }
}


//----------------userVerification Email -----------------------------//

exports.userVerification = async (req , res, next )=>{
    try {
        
        const { error } = userVerificationSchema.validate(req.body);

        if(error){
              return next( new ApiError(400, USERERRORS.LOGINERROR.INSUFFICIENT));
        }

        const {token } = req.body; 

        const result = await rawSqlExecquation(NATIVEQUERIES.FETCHISVALIDATED, [ token ]);

        console.log(result)

        if(result.length < 1){
            return next(new ApiError(401, USERERRORS.VERIFICATION.INVALIDTOKEN))
        }

        console.log(result[0].id)

       const expireAt = result[0].expiresAt ;
       
       if(new Date() > expireAt ){
        return next(new ApiError(200, USERERRORS.VERIFICATION.INVALIDTOKEN))
       }

       console.log(result)

       const id = result[0].userId

    //    const updateuser = await userModel.update({isVerified: true},{where:{id: id }})

    const updateuser = await userModel.update(
        { isVerified: true }, 
        { where: { id: id }, }
      );

     

       console.log(updateuser)

       res.status(200).json({
        success: true,
        message: "user Validated",
        data: []
       })

    } catch (error) {
        console.log("erro in varification ", error);
        next(new ApiError(500,SERVER.INTERNALERROR))
    }
}



//---------------------login user ---------------------------------------//

exports.login = async (req, res, next )=>{
    try {
       
        const { error } = userLoginSchema.validate(req.body)

        if(error){
            return next( new ApiError(400, USERERRORS.LOGINERROR.INSUFFICIENT))
        }

        const { email , password } = req.body ;

        const isUser = await userModel.findOne({
            where:{
                email
            }
        })

        if(!isUser){
            return next(new ApiError(401,USERERRORS.LOGINERROR.INVALIDCREADIENTIAL))
        }

        if(!isUser.dataValues.isVerified){

            const verificationToken = await generateToken()

            const newVerification = await emailModel.create({ userId: isUser.dataValues.id , token: verificationToken})

            if(`${req.protocol}://${req.get('host')}` === PATHS.CHECKER.LOCALSERVER ){
                link = `${PATHS.SENDER.LOCALSERVER}${verificationToken}`
              }else{
                link = `${PATHS.SENDER.SERVER}${verificationToken}`
              }
               
               const mailResult = await sendMail(email, "Activation link", isUser.dataValues.name , link);

            
         return   res.status(201).json({
                success:false,
                message: "Verification link send on your email",
                data: []
            })
        }


        const isPasswordCorrect = await checkPassword(password , isUser.dataValues.password)

        if(!isPasswordCorrect){
            return next( new ApiError(402, USERERRORS.LOGINERROR.INVALIDCREADIENTIAL))
        }

        const token = await generateJwtToken({...isUser.dataValues, password: null})


      res.status(200).json({
        success: true,
        message: "user Login successfuly",
        data : [{...isUser.dataValues, password: null, token}]
      })


        
    } catch (error) {
        console.log("error in login ", error);
        next( new ApiError(500, SERVER.INTERNALERROR))
    }
}
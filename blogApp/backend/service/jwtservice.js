const jwt = require("jsonwebtoken");

const generateJwttoken= async (payload, expiresIn = "24d")=>{
    try {
        
        return await jwt.sign(payload, process.env.JWT_SECRET,{expiresIn})

    } catch (error) {
        console.log("error in jwt generation");
        throw new Error("jwt error")
    }
}


const verifyJwttoken = async (token)=>{
    return await jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateJwttoken, verifyJwttoken }
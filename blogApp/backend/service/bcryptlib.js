const bcrypt = require("bcryptjs")


const generateBcryptPassword = async (password)=>{
    return await bcrypt.hash(password, 10)
}

const checkBcryptPassword = async (password ,hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}
 

module.exports = { generateBcryptPassword, checkBcryptPassword }
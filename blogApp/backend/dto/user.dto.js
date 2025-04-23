const joi =require("joi");


const userSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
}).required()


const userLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
}).required()

module.exports = { userSchema, userLogin }


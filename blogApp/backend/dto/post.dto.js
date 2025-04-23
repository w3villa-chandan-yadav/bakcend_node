const joi = require("joi");


const blogSchema = joi.object({
    title: joi.string().min(5).required(),
    descriptions: joi.string().required(),
    categories: joi.string().required(),
    image: joi.optional()
}).required();

const blogComment = joi.object({
    comment: joi.string().required(),
    blogId: joi.number().required()
}).required()

const categories = joi.object({
    name: joi.string().required()
}).required();



module.exports = { blogSchema, blogComment, categories }
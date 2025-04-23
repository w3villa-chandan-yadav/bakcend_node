const { createblog, commentOnPost, getUserBlogs, deleteBlog, deleteCommentOnPost, createCategories, getAllBlogs, getAllCategories, likeBlog, unlikeBlog } = require("./post.controller");
const { registerUser, loginUser } = require("./user.Controller");

module.exports ={
    registerUser:registerUser,
    loginUser: loginUser,
    createblog: createblog,
    commentOnPost: commentOnPost,
    getUserBlogs: getUserBlogs,
    deleteBlog: deleteBlog,
    deleteCommentOnPost: deleteCommentOnPost,
    createCategories: createCategories,
    getAllBlogs: getAllBlogs,
    getAllCategories: getAllCategories,
    likeBlog:likeBlog,
    unlikeBlog: unlikeBlog
}
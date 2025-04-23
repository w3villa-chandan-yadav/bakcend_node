const express = require("express");
const { registerUser, loginUser, createblog, commentOnPost, getUserBlogs, deleteBlog, getAllBlogs, createCategories, getAllCategories, likeBlog, unlikeBlog } = require("../controllers");
const { isValidUser } = require("../middleware/authenticate.Middleware");
const userRoute = express.Router();

userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser);
userRoute.post("/blog", isValidUser, createblog);
userRoute.post("/comment",isValidUser ,commentOnPost)
userRoute.get("/getPost",isValidUser,getUserBlogs)
userRoute.delete("/delete",isValidUser,deleteBlog)
userRoute.get("/home",getAllBlogs)
userRoute.post("/category",createCategories)
userRoute.get("/getAllcategories", getAllCategories)
userRoute.post("/like",isValidUser, likeBlog)
userRoute.post("/unlike", isValidUser, unlikeBlog)

module.exports = { userRoute }
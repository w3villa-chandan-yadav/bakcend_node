const { ERRORS } = require("../constants/error.Constant");
const { blogSchema, blogComment, categories } = require("../dto/post.dto");
const { ApiError } = require("../middleware/error.Middleware");
const { categoryModle } = require("../models/categories.Model");
const { commentModel } = require("../models/comment.Model");
const { likeModel } = require("../models/likes.Model");
const { postModel } = require("../models/post.Model");
const { userModel } = require("../models/user.Model");


const createblog = async (req, res, next)=>{
    try {
        const { error } = blogSchema.validate(req.body);
        
        if(error){
            console.log(error)
            return next( new ApiError(400, ERRORS.USERERROR.ALLFIELDSREQUIRED))
        };

        const { title, descriptions, categories, image} = req.body ;
        
       const userId = req.user.id ;

        const newBlog = await postModel.create({
            title: title,
            descriptions: descriptions,
            userId: userId,
            categories: categories
        })
        
        console.log(newBlog);

        res.status(201).json({
            success: true,
            message: "Blog has created",
            data: newBlog
        })

    } catch (error) {
        console.log("error in creatin blog", error);
        next( new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const deleteBlog = async (req, res, next)=>{
    try {
        
        const { blogId } = req.body; 

        const blogTODelete = await postModel.findOne({
            where:{
                id: blogId
            }
        })

        if(!blogTODelete){
            return next( new ApiError(401, ERRORS.USERERROR.INVALIDBLOGID))
        }

        if(blogTODelete.dataValues.userId != req.user.id){
            return next(new ApiError(401, ERRORS.USERERROR.NOTALLOWEPOSTDELETION))
        }

        const deletedBlog = await postModel.destroy({
            where:{
                id:blogId
            }
        })

        console.log("deleted post from database ");
        console.log( deletedBlog )

        res.status(200).json({
            success: false,
            message: "Blog deleted successfuly",
            data: []
        })

    } catch (error) {
        console.log("error in deleting the blog ",error);
        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const commentOnPost = async (req, res, next)=>{
    try {
        const { error } = blogComment.validate(req.body);

        if(error){
            return next(new ApiError(500, ERRORS.USERERROR.ALLFIELDSREQUIRED))
        }

        const { comment , blogId } = req.body

        const userId = req.user.id ;

        const newComment = await commentModel.create({
            userId: userId,
            blogId: blogId,
            comment: comment
        })

        res.status(201).json({
            success: true,
            message: "new comment on post",
            data: newComment
        })
        
    } catch (error) {
        console.log("errror in commentOnpost",error);
        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const deleteCommentOnPost = async (req, res, next)=>{
    try {
        const { commentId } = req.body;
        const { id } =  req.user;

        const commentToDeleted = await commentModel.findOne({
            where:{
                id: commentId
            }
        });

        if(!commentToDeleted){
            return next(new ApiError(401, ERRORS.USERERROR.NOTALLOWECOMMENTDELETION))
        }

        if(commentToDeleted.dataValues.userId != id ){
            return next(new ApiError(401, ERRORS.USERERROR.NOTALLOWECOMMENTDELETION))
        };

        const destroyedComment = await commentModel.destroy({
            where:{
                id: commentId
            }
        })

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            data: []
        })
        
    } catch (error) {
        console.log("error in deleteCommentOnPost",error);
        return next( new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const createCategories = async (req, res, next)=>{
    try {

        const { error } = categories.validate(req.body);

        if(error){
            return next( new ApiError(401, ERRORS.USERERROR.ALLFIELDSREQUIRED))
        }

        const { name } = req.body; 
        
        const newCategory = await categoryModle.create({
            name: name
        });

        res.status(201).json({
            success: true,
            message: "New category created",
            data: [newCategory]
        })

        
    } catch (error) {
        console.log("error in creating a categories",error);
        return next( new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const getUserBlogs = async (req, res, next)=>{
    try {
        
        const { id } = req.query ; 
        console.log(id)

        const result = await userModel.findOne({
            where:{
                // email: email
                id: id 
            },
            include:[
               {
                model: postModel,
               }
            ]
        })

        // const result = await userModel.findOne({
        //     where: {
        //       email: email
        //     },
        //     include: [
        //       {
        //         model: postModel,
        //         include: [
        //           {
        //             model: commentModel
        //           }
        //         ]
        //       }
        //     ]
        //   });


        // const result = await userModel.findOne({
        //     where: {
        //       email: email
        //     },
        //     include: [
        //       {
        //         model: postModel,
        //         include: [
        //           {
        //             model: commentModel,
        //             include: [userModel]  // 👈 This includes the commenter info
        //           }
        //         ]
        //       }
        //     ]
        //   });
          




        console.log(result)

        res.status(200).json({
            success: true,
            message: "all data fetched successfully",
            data: result
        })

    } catch (error) {
        console.log("error in the getUserBlogs", error);
        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const getAllBlogs = async (req, res, next)=>{
try {

    const blogs = await postModel.findAll({
        include:[
            {model: userModel},
            {model: likeModel,
                include:[{
                    model: userModel
                }]
            },
            {model: commentModel}
        ],
        logging: console.log()
    })

    console.log(blogs)

    return res.status(200).json({
        success: true,
        message: "All blog fetched",
        data: blogs
    })
    
} catch (error) {
    console.log("error in getting All blogs", error);
    next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
}
}


const getAllCategories = async (req, res, next)=>{
    try {
        
        const allCategories = await categoryModle.findAll();

        return res.status(200).json({
            success: true,
            message: "All categories fetched",
            data: allCategories
        })

    } catch (error) {
        console.log("there is error in getting all categories");
        next(new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const likeBlog = async (req, res, next)=>{
    try {
        const { blogId } = req.body;
        console.log(blogId)


        if(!blogId ){
            return next( new ApiError(401, ERRORS.USERERROR.INVALIDBLOGID))
        }

        const userId = req.user.id

        // const blog = await postModel.findByPk(blogId, {
        //     include: [{ model: likeModel }] // optional: include the user who posted
        //   });

        const like = await likeModel.create({
            userId: userId,
            blogId: blogId
        })


        //   console.log(blog);

          res.status(200).json({
            success: false,
            message: "liked the blog",
            data: []
          })

    } catch (error) {
        console.log("error in the likeBlog model",error);
        next( new ApiError(500, ERRORS.SERVERERROR.INTERNALERROR))
    }
}

const unlikeBlog =async (req, res, next)=>{
    try {
        const { blogId } = req.body;
        console.log(blogId)


        if(!blogId ){
            return next( new ApiError(401, ERRORS.USERERROR.INVALIDBLOGID))
        }

        const userId = req.user.id

        const unlike = await likeModel.destroy({
            where:{
                blogId: blogId,
                userId: userId
            }
        })

        res.status(200).json({
            success: true,
            message: "Blog dislike Successfully",
            data: []
        })
        
    } catch (error) {
        console.log("erro in unliking the post",error)
    }
}

module.exports = { createblog, commentOnPost, getUserBlogs, deleteBlog, deleteCommentOnPost, createCategories, getAllBlogs, getAllCategories 
    ,likeBlog, unlikeBlog
}
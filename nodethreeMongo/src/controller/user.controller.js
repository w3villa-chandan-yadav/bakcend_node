import mongoose from "mongoose";
import User from "../model/user.model.js";


const UserTest = async (req,res,next)=>{

    try {
        // const newUser = await User.create({
        //     name:"chandan",
        //     fullName:"chandan kumar yadav"
        // })

        const isExistingUser = await User.findOne({
            name:"chandan"
        })

        res.status(200).json({
            success:true,
            message:"User created successfully",
            isExistingUser
        })
    } catch (error) {
        console.log('error in the userTest controller')
        next(error)
    }

}

const createUser =async (req,res)=>{
    const session =  await User.startSession()
    try {
        console.log("ddnckns")
        const { userName, fullName } = req.body ;
        console.log(userName,fullName);

        if(!userName || ! fullName){
            return   res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            })
          
        }

        session.startTransaction()
        const newUser = await User.create([{
            name: userName,
            fullName: fullName
        }], { session: session });


        session.commitTransaction()

        return   res.status(200).json({
            success: true,
            message: "User created successfully",
            user: "this"
        })
        
    } catch (error) {
        console.log("errrdor",error)
        session.abortTransaction()
    }finally {
        // End the session after either success or failure
        session.endSession();
    }
}

export {UserTest,createUser}
import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:[9,"your name is to long"],
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        maxLength:[19,"full name can't excced 19 character"],
        required:true
    },
    refferdTo:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Reffered"

    }]

})

const User = mongoose.model("User",UserSchema)

export default User

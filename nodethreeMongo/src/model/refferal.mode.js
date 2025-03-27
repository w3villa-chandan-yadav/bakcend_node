import mongoose  from "mongoose";

const refferalModel = new mongoose.Schema({
    refferdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requied:true,
    },
    name:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true
    }
})

const Reffered = mongoose.model("Reffered",refferalModel)

export default Reffered ;
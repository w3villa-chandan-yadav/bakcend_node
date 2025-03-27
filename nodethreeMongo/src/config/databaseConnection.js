import mongoose from "mongoose";

const url  = "mongodb+srv://chandan:chandan@cluster0.hsa9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbconnnect = ()=>{
    mongoose.connect(url).then(()=>{
        console.log("data base connected successfully")
    }).catch((error)=>{
        console.log(`database conncection error`,error)
    })
}
 export {dbconnnect} ;
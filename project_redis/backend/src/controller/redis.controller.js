import fs from "fs"
import client from "../config/redisConnection.js"
import { updateRedisWithKey } from "../helper/redis.helper.js";
import { logger } from "../config/winston.config.js";
const url ="/home/w3villa/Desktop/Node_traning/project_redis/backend/responseData.json"

const homePage = async (req , res , next)=> {
    try {
        console.log(req.originalUrl)
        logger.info(`this is logger from homepage get ${req.method} and url:-${req.originalUrl}`)
        const result = await client.get("products");
        if(result){   
            console.log("this data is form redis") 
            return res.status(200).json({
                success: true ,
                message: "data fetch successfully",
                data: JSON.parse(result)
            });
        };
        const datas = fs.readFileSync( url ,"utf-8");     
        // const redis = await client.setEx("products",260,datas);
        const redis = await updateRedisWithKey("products", datas)
        if(redis){
            console.log("products set in redis");
        }
        console.log("data from backend");
        // console.log(datas);
        res.status(200).json({
            success: true,
            message : "data fetch successfully",
            data: JSON.parse(datas)
        })
    } catch (error) {
       console.log("error in the homePage Route", error);
       next(new Error("this is error in home page"))     
    }
}


const UpdateProducts = async (req, res, next)=>{
    try {
        logger.info(`this is the update title:${req.body.title}`)
        const { discription , title } = req.body ;
        const deleteExistingProducts  = await client.del("products");
        const result = fs.readFileSync(url , "utf-8") ;
        const data = JSON.parse( result );
        const updatedData = fs.writeFileSync(url, result);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
        console.log("result of what happen in deletion", 
            deleteExistingProducts
        );
        res.status(200).json({
            success: true,
            message: "Update successfully",
            data: data
        });
    } catch (error) {
       console.log("error in updateProducts", error);
       next(new Error("error in updateProducts route"));
    }
}
export { homePage , UpdateProducts}
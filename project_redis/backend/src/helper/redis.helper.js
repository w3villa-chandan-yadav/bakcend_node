import client from "../config/redisConnection.js"

const updateRedisWithKey =async (key,data)=>{
    try {       
        const updated = await client.setEx(key,360,data);
        if(updated){
            return true ;
        }else{
            return false ;
        }
    } catch (error) {
        console.log("error in redis updatation ", error)
        throw new Error("error in redis updatation")
    }
}


export {updateRedisWithKey}
import { createClient } from "redis";

const client = createClient({
     url:"redis://redis-12251.c264.ap-south-1-1.ec2.redns.redis-cloud.com:12251",
  password: 'qxhtxj5weqIeGUVRu8ompTFrGlsfdbCj'
})

client.on("error",(error)=>{
    console.log("Redis connection error in worker")
})

await client.connect()


 async function main() {
    while(true){
        // async function redisWorker(){
        const data = await  client.brPop("submission",0);
        await new Promise(r => setTimeout(r("worker"),2000))
            console.log("in the worker") 
    }
 }

 main()
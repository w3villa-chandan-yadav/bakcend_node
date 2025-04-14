import { createClient } from "redis";

//////---------------------------connect redis------------------------------------///////////////
const client = createClient({
  url:"redis://redis-12251.c264.ap-south-1-1.ec2.redns.redis-cloud.com:12251",
  password: 'qxhtxj5weqIeGUVRu8ompTFrGlsfdbCj'
});


// redis.cli -h redis-12251.c264.ap-south-1-1.ec2.redns.redis-cloud.com -p 12251   --  -- command to connect from termial 

// username: 'default',
// password: 'qxhtxj5weqIeGUVRu8ompTFrGlsfdbCj',
// socket: {
//     host: 'redis-12251.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
//     port: 12251
// }

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

// await client.set('foo', 'bar');
// await client.set('foo',"barrrrr")
const result = await client.get('foo');
console.log(result)  // >>> bar


export default client ;

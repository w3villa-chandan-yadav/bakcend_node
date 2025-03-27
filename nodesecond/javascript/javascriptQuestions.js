const fs =  require("fs")
const emitter = require('events')
const {addTwoNumber} = require("./example")
// console.log(__dirname)

const input = fs.readFileSync(__dirname+'/main.txt','utf-8');

console.log(input)
// let line = input.split('\n');

// console.log(line)

// for (let sentence of line){
//     fs.appendFile(`output${Date.now()}.txt`,sentence+ '\n',(err)=>{
//     if(err){
//         console.log("error aa gai ooooye")

//     }
//     })
// }

const myEmmiter = new emitter();


myEmmiter.on("oyeee",()=>{
    console.log("some one just shouted oyeeee")
})


const shout = function call(){
    myEmmiter.emit('oyeee')
}

setTimeout(()=>{

    shout();
    shout()

},5000)



const pr = new Promise((res)=>setTimeout(()=>res("hello"),5000));

// pr.then((res)=>{
//     console.log(res)
// })



 function twoSum(x,y){
    return x+y
 }

 function callbackSum(x,y,sum){
    return sum(x,y)
 }

 console.log(callbackSum(3,4,addTwoNumber))
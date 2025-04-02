const fs = require("fs");

const url = "/home/w3villa/Desktop/Node_traning/database/backend/userDatabase.txt"


exports.deleteTodo = async (id)=>{
  try {
    const data = await fs.readFileSync(url,"utf8");

    const line = data.split("\n");

    const parseData = line.map((ele)=>{
        return JSON.parse(ele) ;
    })

    const newData = parseData.filter((ele)=>{
        return ele.id != id ;
    })

    const stringifyData  =  newData.map((ele)=>{
        return  JSON.stringify(ele) ;
    }).join("\n")



    await fs.writeFileSync(url,stringifyData,"utf8")

  } catch (error) {
    console.log("error in deleting todo ");
    throw new Error("Error in deleting the todos")
  }
}
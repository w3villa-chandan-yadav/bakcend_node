const fs = require("fs")
const {v4 : uuid} = require("uuid")
const url = "/home/w3villa/Desktop/Node_traning/database/backend/userDatabase.txt"

exports.createNewwTodo = async (todos) =>{
    try {
        console.log("this is to do")
        const newTodo = {
            id: uuid(),
            todo: todos
        }

        const todo = JSON.stringify(newTodo);

        // console.log(todo)

        await fs.promises.appendFile(url,"\n"+todo)

        console.log(" new todo added")
    } catch (error) {
      console.log("error in createTodo");
      throw new Error("error in the createTodo")
    }
}
const fs =require("fs")

const url = "/home/w3villa/Desktop/Node_traning/database/backend/"

const  createTodo = require("../helpers/createTodo")
const { updateTodo } = require("../helpers/updadates")



exports.getAlltodos = async (req,res)=>{
    try {

        console.log("herere")
        const fileName =url+"userDatabase.txt"
        // console.log(__dirname)

    //   const todo=  {id:"2",
    //    todo:"this has to be done"}

    //    console.log(JSON.stringify(todo))

        const data = await fs.promises.readFile(fileName, "utf8",);
        
        const datas = data.split("\n");

       

        // console.log(JSON.parse(datas))
        const newData = [] ;
        datas.map((ele)=>{
          newData.push((JSON.parse(ele)))
        }) 
        // newData.map((ele)=>{
        //     console.log(ele.id)
        // })

        res.status(200).json({
            success: true,
            message: " this is successfull",
            data:newData
        })
    
    } catch (error) {
        
        
    }
}


exports.createTodos = async(req,res)=>{
    try {
        
        const { todo } = req.body ;

        console.log("create todo")
        await createTodo.createNewwTodo(todo);
        console.log("created todo")

        console.log("new tod created ");

        res.status(200).json({
            success: true,
            message: "new todo created"
        })

    } catch (error) {
        
    }
}



exports.updatedTodos = async (req,res)=>{
    try {
        
        const { id, todo} = req.body ;

        await updateTodo(id,todo) ;

        console.log("updated");

        res.status(200).json({
            success: true,
            message: "todo updated successfully"
        })

    } catch (error) {
        console.log("error in the update todo")
        throw new Error("update error")
    }
}
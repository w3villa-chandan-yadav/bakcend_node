const express = require("express");
const { getAlltodos, createTodos, updatedTodos } = require("../controller/user.controller");
const route = express.Router();


route.get("/todo",getAlltodos);

route.post("/createTodo",createTodos);

route.put("/update",updatedTodos);



module.exports = route ;
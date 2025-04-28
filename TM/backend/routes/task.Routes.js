const express = require("express");
const { isAuthenticate } = require("../middleware/auth.Middleware");
const { createTask, getAllTask, updateTaskStatus, deleteTask, createGroup, groupTasks } = require("../controler/task.controller");
const taskRoute = express.Router();

taskRoute.post("/create", isAuthenticate, createTask)
taskRoute.get("/getAllTask", isAuthenticate, getAllTask)
taskRoute.put("/taskUpdateStatus", isAuthenticate, updateTaskStatus)
taskRoute.delete("/deleteTask", isAuthenticate, deleteTask)
taskRoute.post("/createGroup", isAuthenticate, createGroup)
taskRoute.get("/getGroupTask", isAuthenticate, groupTasks)


module.exports = { taskRoute }
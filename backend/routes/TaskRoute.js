import express from "express";
import taskController from "../controller/taskController.js";
const{ getTask, createTask, updateTask, deleteTask } = taskController;

const taskRouter = express.Router();

taskRouter.post("/getTask",getTask);
taskRouter.post("/createTask",createTask);
taskRouter.put("/updateTask",updateTask);  
taskRouter.delete("/deleteTask",deleteTask);


export default taskRouter;

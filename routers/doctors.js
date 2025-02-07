import express from 'express';
import doctorController from '../Controllers/doctorController.js';
const routers = express.Router();

//Index
routers.get("/", doctorController.index);

//Show
routers.get("/:id", doctorController.show);

//Create
routers.post("/", doctorController.create);

export default routers;
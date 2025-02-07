import express from 'express';
import doctorController from '../Controllers/doctorController.js';
const routers = express.Router();

//Index
routers.get("/", doctorController.getDoctors);

//Show
routers.get("/:id", doctorController.getSingleDoctor);

//Create
routers.post("/", doctorController.createDoctor);

export default routers;
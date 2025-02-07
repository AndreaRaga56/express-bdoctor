import express from 'express';
import doctorController from '../Controllers/doctorController.js';
import upload from '../Middleware/file-upload.js';
const routers = express.Router();

//Index
routers.get("/", doctorController.getDoctors);

//Show
routers.get("/:slug", doctorController.getSingleDoctor);

//Create
routers.post("/", upload.single('immagine'), doctorController.createDoctor);

export default routers;
import express from 'express';
import esempioController from '../Controllers/esempioController.js';
const routers = express.Router();

//Index
routers.get("/", esempioController.index);

//Show
routers.get("/:id", esempioController.show);

export default routers;

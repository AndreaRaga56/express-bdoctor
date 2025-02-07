import express from 'express';
import specializationController from '../Controllers/specializationController.js';
const routers = express.Router();

//Index
routers.get("/", specializationController.index);

export default routers;

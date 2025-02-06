import express from 'express';
import specializationController from '../Controllers/specializationController';
const routers = express.Router();

//Index
routers.get("/", specializationController.index);

export default routers;

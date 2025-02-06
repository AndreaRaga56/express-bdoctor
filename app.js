//Express init
import express from 'express';
const app = express();
const port = process.env.SERVER_PORT;
import esempioRouter from './routers/esempio.js';
import corsMiddleware from 'cors'

app.use(corsMiddleware({
    origin:"http://localhost:5173",
}));

app.use(express.json());

app.use(express.static("public"));

app.use("/esempio", esempioRouter);


app.listen(port, () => {
    console.log("Ascolto mode ON");
});

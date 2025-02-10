import express from 'express';
const app = express();
const port = process.env.SERVER_PORT;
import notFound from './Middleware/notFound.js';
import reviewsRouter from './routers/reviews.js';
import specializationsRouter from './routers/specialization.js';
import doctorsRouter from './routers/doctors.js';
import corsMiddleware from 'cors'


// collegamento al frontend
app.use(corsMiddleware({
    origin:"http://localhost:5173",
}));

// gstisce i dati inviati in fomato json
app.use(express.json());

//rende accessibile la cartella public
app.use(express.static("public"));

// Include reviews in tutte le rotte nel reviews router
app.use("/reviews", reviewsRouter);

app.use("/specialization", specializationsRouter);

app.use("/doctors", doctorsRouter);

// Gestisce le richieste a rotte inesistenti
app.use(notFound);


//apre la porta del server
app.listen(port, () => {
    console.log("Server in ascolto");
});

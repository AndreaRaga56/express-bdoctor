// Funzione middleware per gestire gli errori
const errorsHandler = (err, req, res, next) => {
    // Stampa lo stack dell'errore nella console per il debug
    console.error(err.stack);

    // Controlla se gli header della risposta sono già stati inviati
    if (!res.headersSent) {
        
        res.status(500).json({
            status: 'fail', 
            message: err.message, 
            // Aggiunge i dettagli dell'errore se l'ambiente è di sviluppo
            ...(process.env.ENVIROMENT === 'development' && { detail: err.stack }) 
        });
    } else {
        // Se gli header sono già stati inviati, passa l'errore al prossimo middleware
        next(err);
    }
};


export default errorsHandler;
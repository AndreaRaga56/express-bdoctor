import connection from '../data/db.js';

//Funzione per prelevare le recensioni di  un singolo dottore
function getReviews(req, res, next) {
    // const reviewId = req.params.id;
    const slug = req.params.slug;
    const sql = `
        SELECT reviews.* 
        FROM reviews
        INNER JOIN doctors ON reviews.id_doctor = doctors.id
        WHERE doctors.slug = ?;
        `;
    connection.query(sql, [slug], (err, result) => {
        if (err) {
            return next(new Error(err.message));

        } else {
            return res.json({
                status: 'success',
                data: result
            });
        }
    });
}


//Funzione per creare una nuova recensione 
function createReviews(req, res, next) {
    
    const slug = req.params.slug;
    const { patient_name, rating, content, email } = req.body;

    // Validazione del voto
    if (isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il voto deve essere un valore numerico tra 0 e 5'
        });
    }

    // Validazione del nome
    if (typeof patient_name !== 'string' || patient_name.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il nome deve avere più di 3 caratteri'
        });
    }

    // Validazione del testo
    if (content && content.trim().length > 0 && content.trim().length < 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il testo deve essere lungo almeno 6 caratteri'
        });
    }

    // Validazione email
    if (!email.includes('@')) {
        return res.status(400).json({ status: "error", message: "La mail inserita non è valida" });
    }

    // Controlla se il dottore esiste
    const doctorSql = `SELECT * FROM doctors WHERE slug = ?`;
    connection.query(doctorSql, [slug], (err, result) => {
        if (err) {
            return next(new Error('Errore nella query del database'));
        }
        if (result.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Dottore non trovato' });
        }

        const doctorId = result[0].id;
        
        // Se esiste crea la recensione
        const sql = `INSERT INTO reviews (id_doctor, patient_name, rating, content, email) VALUES (?, ?, ?, ?, ?)`;
        connection.query(sql, [doctorId, patient_name, rating, content, email], (err, results) => {
            if (err) {
                return next(new Error('Errore nella query del database'));
            }
            res.status(201).json({ 
                status: 'success', 
                message: 'Recensione aggiunta' 
            });
        });
    });
}

export default {
    getReviews,
    createReviews
};
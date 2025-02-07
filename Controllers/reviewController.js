import connection from '../data/db.js';

function getReviews(req, res, next) {
    const reviewId = req.params.id;
    const sql = `
        SELECT recensioni.* 
        FROM recensioni
        INNER JOIN dottori ON recensioni.id_dottore = dottori.id
        WHERE dottori.id = ?;
        `;
    connection.query(sql, [reviewId], (err, result) => {
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

function createReviews(req, res, next) {
    
    const doctorId = req.params.id;
    const { name, vote, text } = req.body;

    // Validazione del voto
    if (isNaN(vote) || vote < 0 || vote > 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il voto deve essere un valore numerico tra 0 e 5'
        });
    }

    // Validazione del nome
    if (typeof name !== 'string' || name.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il nome deve avere più di 3 caratteri'
        });
    }

    // Validazione del testo
    if (text && text.trim().length > 0 && text.trim().length < 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il testo deve essere lungo almeno 6 caratteri'
        });
    }

    // Controlla se il dottore esiste
    const doctorSql = `SELECT * FROM dottori WHERE id = ?`;
    connection.query(doctorSql, [doctorId], (err, result) => {
        if (err) {
            return next(new Error('Errore nella query del database'));
        }
        if (result.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'Dottore non trovato' });
        }
        
        // Se esiste crea la recensione
        const sql = `INSERT INTO recensioni (id_dottore, nome_paziente, voto, testo) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [doctorId, name, vote, text], (err, results) => {
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
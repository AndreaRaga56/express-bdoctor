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
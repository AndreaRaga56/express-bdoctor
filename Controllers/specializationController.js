import connection from '../data/db.js';

// Funzione per ottenere tutte le specializzazioni
const index = (req, res, next) => {
    const sql = `
    SELECT *
    FROM specializations
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return next(new Error(err.message));
        }

        if (results.length === 0) {
            return res.status(400).json({
                status: "failed",
                message: "Nessuna specializzazione trovata"
            });
        }

        res.status(200).json({
            status: "success",
            data: results
        });
    });
}

export default { index };

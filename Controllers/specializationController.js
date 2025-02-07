import connection from '../data/db.js';

const index = (req, res, next) => {
    const sql = `
    SELECT *
    FROM specializzazioni
    `

    connection.query(sql, (err, results, next) => {
        if (err) {
            return next( new Error( err.message));
            
        }

        if (results.length === 0) {
            return res.status(400).json({
                status: "failed",
                message: "Nessuna specializzazione trovata"
            })
        }

        res.status(200).json(results);
    })
}

export default { index };
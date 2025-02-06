import connection from '../data/db.js';

const index = (req, res, next) => {
    const sql = `
    SELECT *
    FROM specializzazioni
    `

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: "failed",
                messagge: "Errore interno del server"
            })
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
import connection from '../data/db.js';

function index(req, res, next) {
    const sql = `
        SELECT dottori.id, dottori.nome, dottori.cognome, dottori.email, dottori.telefono, 
               dottori.indirizzo, dottori.immagine, specializzazioni.nome AS specializzazione,
               IFNULL(AVG(recensioni.voto), 0) AS media_voto
        FROM dottori
        LEFT JOIN recensioni ON dottori.id = recensioni.id_dottore
        JOIN specializzazioni ON dottori.id_specializzazione = specializzazioni.id
        GROUP BY dottori.id
        ORDER BY dottori.nome ASC;
    `;

    db.query(sql)
        .then(([rows]) => {
            return res.status(200).json({ status: "success", data: rows });
        })
        .catch((error) => {
            console.error("Errore nel recupero dei dottori:", error);
            return res.status(500).json({ status: "error", message: "Errore nel recupero dei dottori" });
        });
}




function show(req, res, next) {
    const docId = parseInt(req.params.id);
    const sql = "SELECT * FROM dottori WHERE id=?;";
    const sqlReview = 
    SELECT recensioni.id, recensioni.nome_paziente AS patient, recensioni.voto AS voto, recensioni.testo AS text
    from dottori
    inner join recensioni
    on dottori.id=recensioni.id_dottore
    WHERE dottori.id=?;;
    connection.query(sql, [docId], (err, result) => {
        if (err) {
            next(new Error("Errore interno del server"));
        } else if (result.length === 0) {
            next(new Error("Il medico che stai cercando non è presente nel Database"));
        } else {
            connection.query(sqlReview, [docId], (err2, reviews) => {
                let data = {
                    ...result[0]
                }
                if (reviews) {
                    data.reviews = reviews
                }
                res.status(200).json({
                    status: "Success",
                    data
                })
            })
        }
    })
}

function create(req, res, next) {
    
}

export default { index, show, create};
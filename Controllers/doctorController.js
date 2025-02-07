import connection from '../data/db.js';

function getDoctors(req, res, next) {
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
  
    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Errore nel recupero dei dottori:", err);
            return next(new Error("Errore nel recupero dei dottori"));
        }

        return res.status(200).json({ status: "success", data: result });
    });
}

function getSingleDoctor(req, res, next) {
    const docId = parseInt(req.params.id);

    const sql = `
        SELECT dottori.*, specializzazioni.nome AS specializzazione
        FROM dottori
        LEFT JOIN specializzazioni ON dottori.id_specializzazione = specializzazioni.id
        WHERE dottori.id = ?;
    `;

    const sqlReview = `
        SELECT recensioni.id, recensioni.nome_paziente AS patient, recensioni.voto AS voto, recensioni.testo AS text
        FROM recensioni
        WHERE recensioni.id_dottore = ?;
    `;

    connection.query(sql, [docId], (err, result) => {
        if (err) {
            console.error("❌ Errore nella query principale:", err);
            return next(new Error("Errore interno del server"));
        }

        if (result.length === 0) {
            return res.status(404).json({ status: "error", message: "Il medico che stai cercando non è presente nel Database" });
        }

        const doctorData = result[0];

        connection.query(sqlReview, [docId], (err2, reviews) => {
            if (err2) {
                console.error("❌ Errore nel recupero delle recensioni:", err2);
                return next(new Error("Errore interno del server nel recupero delle recensioni"));
            }

            doctorData.reviews = reviews || [];

            res.status(200).json({
                status: "success",
                data: doctorData
            });
        });
    });
}

function createDoctor(req, res, next) {
    const { id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine } = req.body;

    if (!id_specializzazione || !nome || !cognome || !email || !telefono || !indirizzo || !immagine) {
        return res.status(400).json({ status: "error", message: "Tutti i campi sono obbligatori" });
    }

    const sql = `
        INSERT INTO dottori (id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(sql, [id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine], (err, result) => {
        if (err) {
            console.error("❌ Errore nella creazione del dottore:", err);
            return next(new Error("Errore durante la creazione del dottore"));
        }

        res.status(201).json({ status: "success", message: "Dottore creato con successo", id: result.insertId });
    });
}

export default { 
    getDoctors,
    getSingleDoctor,
    createDoctor
};

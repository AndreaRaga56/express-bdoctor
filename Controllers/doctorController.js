import connection from '../data/db.js';
import slugify from 'slugify';

function getDoctors(req, res, next) {
    const sql = `
        SELECT dottori.id, dottori.nome, dottori.cognome, dottori.slug, dottori.email, dottori.telefono, 
               dottori.indirizzo, dottori.immagine, specializzazioni.nome AS specializzazione,
               ROUND(IFNULL(AVG(recensioni.voto), 0), 2) AS media_voto
        FROM dottori
        LEFT JOIN recensioni ON dottori.id = recensioni.id_dottore
        JOIN specializzazioni ON dottori.id_specializzazione = specializzazioni.id
        GROUP BY dottori.id
        ORDER BY media_voto DESC, dottori.nome ASC;
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return next(new Error("Errore nel recupero dei dottori"));
        }

        console.log("Dati medici inviati al frontend:", result); // 🔍 DEBUG
        return res.status(200).json({ status: "success", data: result });
    });
}


function getSingleDoctor(req, res, next) {
    const slug = req.params.slug;

    const sql = `
        SELECT dottori.*, specializzazioni.nome AS specializzazione
        FROM dottori
        LEFT JOIN specializzazioni ON dottori.id_specializzazione = specializzazioni.id
        WHERE dottori.slug = ?;
    `;

    const sqlReview = `
        SELECT recensioni.id, recensioni.nome_paziente AS patient, recensioni.voto AS voto, recensioni.testo AS text
        FROM recensioni
        WHERE recensioni.id_dottore = ?;
    `;

    connection.query(sql, [slug], (err, result) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }

        if (result.length === 0) {
            return res.status(404).json({ status: "error", message: "Il medico che stai cercando non è presente nel Database" });
        }

        const doctorData = result[0];

        connection.query(sqlReview, [doctorData.id], (err2, reviews) => {
            if (err2) {
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
    const slug = slugify(nome + '-' + cognome, {
        lower: true,
        strict: true,
    });

    //Validazioni

    //Tutti i campi sono obbligatori
    if (!id_specializzazione || !nome || !cognome || !email || !telefono || !indirizzo || !immagine) {
        return res.status(400).json({ status: "error", message: "Tutti i campi sono obbligatori" });
    }

    // Validazione del nome
    if (typeof nome !== 'string' || nome.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il nome deve avere più di 3 caratteri'
        });
    }

    // Validazione del cognome
    if (typeof cognome !== 'string' || cognome.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il cognome deve avere più di 3 caratteri'
        });
    }

    // Verifica se il numero di telefono è valido
    const phoneRegex = /^\+?[0-9]{1,15}$/;
    if (!phoneRegex.test(telefono)) {
        return res.status(400).json({ status: "error", message: "Il numero di telefono non è valido." });
    }

    // Validazione indirizzo
    if (typeof indirizzo !== 'string' || indirizzo.trim().length <= 5) {
        return res.status(400).json({
            status: 'fail',
            message: "L'indirizzo deve avere più di 5 caratteri"
        });
    }

    // Validazione email
    if (!email.includes('@')) {
        return res.status(400).json({ status: "error", message: "La mail inserita non è valida" });
    }

    //Verifica se la mail già esiste
    const checkEmailSql = "SELECT id FROM dottori WHERE email = ?"
    connection.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            return next(new Error(err.message));
        }

        if (result.length > 0) {
            return res.status(400).json({ status: "error", message: "Email già registrata" });
        }
    })

    const sql = `
        INSERT INTO dottori (id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine, slug) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(sql, [id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine, slug], (err, result) => {
        if (err) {
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

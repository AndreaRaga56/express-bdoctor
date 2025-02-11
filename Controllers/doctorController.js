import connection from '../data/db.js';
import slugify from 'slugify';

// Funzione per ottenere lista dottori partendo dal voto più alto
function getDoctors(req, res, next) {
    const sql = `
        SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.slug, doctors.email, doctors.phone, 
       doctors.address, doctors.image, specializations.name AS specialization,
       ROUND(IFNULL(AVG(reviews.rating), 0), 2) AS average_rating
       FROM doctors
       LEFT JOIN reviews ON doctors.id = reviews.id_doctor
       JOIN specializations ON doctors.id_specialization = specializations.id
       GROUP BY doctors.id
       ORDER BY average_rating DESC, doctors.first_name ASC;

    `;

    connection.query(sql, (err, result) => {
        if (err) {
            return next(new Error("Errore nel recupero dei dottori"));
        }
        return res.status(200).json({ status: "success", data: result });
    });
}

// Funzione per ottenere i dettagli di un singolo dottore
function getSingleDoctor(req, res, next) {
    const slug = req.params.slug;

    // include le informazioni di specializzazione
    const sql = `
       SELECT doctors.*, specializations.name AS specialization
       FROM doctors
       LEFT JOIN specializations ON doctors.id_specialization = specializations.id
       WHERE doctors.slug = ?;

    `;

    // filtra le recensioni utilizzando l'id
    const sqlReview = `
        SELECT reviews.id, reviews.patient_name AS patient, reviews.rating AS rating, reviews.content 
        FROM reviews
        WHERE reviews.id_doctor = ?;

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

// Funzione per creare un nuovo dottore
function createDoctor(req, res, next) {
    const { id_specialization, first_name, last_name, email, phone, address, image, gender, description } = req.body;
    const slug = slugify(first_name + '-' + last_name, {
        lower: true,
        strict: true,
    });

    //Validazioni

    //Tutti i campi sono obbligatori
    if (!id_specialization || !first_name || !last_name || !email || !phone || !address || !image || !description || !gender) {
        return res.status(400).json({ status: "error", message: "Tutti i campi sono obbligatori" });
    }

    // Validazione del nome
    if (typeof first_name !== 'string' || first_name.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il nome deve avere più di 3 caratteri'
        });
    }

    // Validazione del cognome
    if (typeof last_name !== 'string' || last_name.trim().length <= 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il cognome deve avere più di 3 caratteri'
        });
    }

    // Verifica se il numero di telefono è valido
    const phoneRegex = /^\+?[0-9]{1,15}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ status: "error", message: "Il numero di telefono non è valido." });
    }

    //Verifica se il telfono già esiste
    const checkPhoneSql = "SELECT id FROM doctors WHERE phone = ?"
    connection.query(checkPhoneSql, [phone], (err, result) => {
        if (err) {
            return next(new Error(err.message));
        }

        if (result.length > 0) {
            return res.status(400).json({ status: "error", message: "Numero di telefono già registrato" });
        }
    })

    // Validazione indirizzo
    if (typeof address !== 'string' || address.trim().length <= 5) {
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
    const checkEmailSql = "SELECT id FROM doctors WHERE email = ?"
    connection.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            return next(new Error(err.message));
        }

        if (result.length > 0) {
            return res.status(400).json({ status: "error", message: "Email già registrata" });
        }
    })

    const sql = `
        INSERT INTO doctors (id_specialization, first_name, last_name, email, phone, address, image, gender, description, slug) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(sql, [id_specialization, first_name, last_name, email, phone, address, image, gender, description, slug], (err, result) => {
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

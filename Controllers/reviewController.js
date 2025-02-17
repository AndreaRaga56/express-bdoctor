import connection from '../data/db.js';
import transporter from '../data/sendMail.js';

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
    if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il voto deve essere un valore numerico tra 1 e 5'
        });
    }

    // Validazione del nome
    if (typeof patient_name !== 'string' || patient_name.trim().length < 3) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il nome deve avere più di 3 caratteri'
        });
    }

    // Validazione del testo
    if (content && content.trim().length > 0 && content.trim().length < 5) {
        return res.status(400).json({
            status: 'fail',
            message: 'Il testo deve essere lungo almeno 5 caratteri'
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
        const doctorEmail = result[0].email;

        // Se esiste crea la recensione
        const sql = `INSERT INTO reviews (id_doctor, patient_name, rating, content, email, data) VALUES (?, ?, ?, ?, ?, CURDATE())`;
        connection.query(sql, [doctorId, patient_name, rating, content, email], (err, results) => {
            if (err) {
                return next(new Error('Errore nella query del database'));
            }

            // Dopo aver aggiunto la recensione, invia la mail con Mailtrap
            const mailOptions = {
                from: `${email}`,
                to: doctorEmail,
                subject: 'Hai ricevuto una nuova recensione!',
                text: `Ciao, hai ricevuto una nuova recensione da ${patient_name}.\n\n` +
                    `Voto: ${rating}/5\n` +
                    `Testo: ${content}\n\n` +
                    `Email del paziente: ${email}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Errore durante l\'invio dell\'email:', error);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Recensione aggiunta, ma errore nell\'invio della notifica email.',
                    });
                } else {
                    console.log('Email inviata:', info.response);
                    res.status(201).json({
                        status: 'success',
                        message: 'Recensione aggiunta e notifica email inviata al dottore.',
                    });
                }
            });
        });
    });
}

export default {
    getReviews,
    createReviews
};
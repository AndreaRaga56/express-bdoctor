import connection from '../data/db.js';
import slugify from 'slugify';


// Funzione per ottenere lista dottori partendo dal voto più alto
function getDoctors(req, res, next) {
    // Estrae i parametri di paginazione dalla query string, con valori predefiniti
    const { page = 1, limit = 9 } = req.query;
    //determina da quale riga iniziare a restituire i risultati
    const offset = (page - 1) * limit;

    // Query SQL per ottenere i dottori con le loro specializzazioni e la media delle recensioni
    let sql = `
    SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.slug, doctors.email, doctors.phone, 
       doctors.address, doctors.image, specializations.name AS specialization,
       ROUND(IFNULL(AVG(reviews.rating), 0), 2) AS average_rating
       FROM doctors
       LEFT JOIN reviews ON doctors.id = reviews.id_doctor
       JOIN specializations ON doctors.id_specialization = specializations.id
    `;
    // Query SQL per contare il numero totale di dottori
    let countSql = `
    SELECT COUNT(*) as total
	    FROM doctors
	    JOIN specializations ON doctors.id_specialization = specializations.id
   `;

    let filter = []
    // Aggiunge filtri alla query se presenti nella richiesta
    if (req.query.name || req.query.address || req.query.specialization) {
        const { name, address, specialization } = req.query;


        // Filtra per specializzazione
        if (specialization && filter.length === 0) {
            sql = `${sql} WHERE specializations.name LIKE ?`
            countSql = `${countSql} WHERE specializations.name LIKE ?`
            filter = [`%${specialization}%`]
        }
        // Filtra per indirizzo
        if (address && filter.length === 0) {
            for (let i = 0; i < address.length; i++) {
                if (i === 0) {
                    // Aggiunge una clausola WHERE per il primo elemento
                    sql = `${sql} WHERE doctors.address LIKE ?`
                    countSql = `${countSql} WHERE doctors.address LIKE ?`
                    filter = [`%${address[i]}%`]
                } else {
                    // Aggiunge una clausola AND per gli elementi successivi
                    sql = `${sql} AND doctors.address LIKE ?`
                    countSql = `${countSql} AND doctors.address LIKE ?`
                    filter = [...filter, `%${address[i]}%`]
                }
            }
        } else if (address && filter.length > 0) {
            for (let i = 0; i < address.length; i++) {
                // Aggiunge una clausola AND per ogni elemento 
                sql = `${sql} AND doctors.address LIKE ?`
                countSql = `${countSql} AND doctors.address LIKE ?`
                filter = [...filter, `%${address[i]}%`]
            }
        }
        // Filtra per nome
        if (name && filter.length === 0) {
            sql = `${sql} WHERE (doctors.first_name LIKE ? OR doctors.last_name LIKE ?)`
            countSql = `${countSql} WHERE (doctors.first_name LIKE ? OR doctors.last_name LIKE ?)`
            filter = [`%${name}%`, `%${name}%`]

        } else if (name && filter.length > 0) {
            sql = `${sql} AND (doctors.first_name LIKE ? OR doctors.last_name LIKE ?)`
            countSql = `${countSql} AND (doctors.first_name LIKE ? OR doctors.last_name LIKE ?)`
            filter = [...filter, `%${name}%`, `%${name}%`]
        }
    }
    // Aggiunge clausole di raggruppamento, ordinamento e paginazione alla query
    sql = `${sql} 
       GROUP BY doctors.id
       ORDER BY average_rating DESC, doctors.first_name ASC
       LIMIT ? OFFSET ?;
    `;
    // Esegue la query per contare il numero totale di dottori
    connection.query(countSql, filter, (err, countResult) => {
        if (err) {
            return next(new Error("Errore nel recupero del conteggio dei dottori"));
        }
            // Aggiunge i parametri di limit e offset all'array filter
        filter = [...filter, parseInt(limit), parseInt(offset)]
       // Ottiene il numero totale di dottori
        const totalDoctors = countResult[0].total;
        // Calcola il numero totale di pagine
        const totalPages = Math.ceil(totalDoctors / limit);
        // Esegue la query per ottenere i dottori
        connection.query(sql, filter, (err, result) => {
            if (err) {
                return next(new Error("Errore nel recupero dei dottori"));
            }
            return res.status(200).json({
                status: "success",
                totalDoctors: totalDoctors,
                page: parseInt(page),
                totalPages: totalPages,
                limit: parseInt(limit),
                data: result
            });
        });
    });
}

// Funzione per ottenere i dettagli di un singolo dottore
function getSingleDoctor(req, res, next) {
    const slug = req.params.slug;


    // Query SQL per ottenere i dettagli del dottore e la sua specializzazione
    const sql = `
       SELECT doctors.*, 
       specializations.name AS specialization,
       ROUND(IFNULL(AVG(reviews.rating), 0), 2) AS average_rating
       FROM doctors
       LEFT JOIN specializations ON doctors.id_specialization = specializations.id
       LEFT JOIN reviews ON doctors.id = reviews.id_doctor
       WHERE doctors.slug = ?
       GROUP BY doctors.id, specializations.name;
    `;

    // Query SQL per ottenere le recensioni del dottore
    const sqlReview = `
        SELECT reviews.id, reviews.patient_name, reviews.rating AS rating, reviews.content, reviews.email, reviews.data
        FROM reviews
        WHERE reviews.id_doctor = ?
        ORDER BY  reviews.data DESC, reviews.rating DESC;
      `;
    // Esegue la query per ottenere i dettagli del dottore
    connection.query(sql, [slug], (err, result) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }

        if (result.length === 0) {
            return res.status(404).json({ status: "error", message: "Il medico che stai cercando non è presente nel Database" });
        }
        //accede al primo elemento dell'array result
        const doctorData = result[0];
        // Esegue la query per ottenere le recensioni del dottore
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
    // utilizza l'operatore di optional chaining (?.) per accedere alla proprietà filename dell'oggetto req.file
    const image = req.file?.filename || null; // `image` facoltativo
    const { id_specialization, first_name, last_name, email, phone, address, gender, description, emailOnly, phoneOnly } = req.body;
    const slug = slugify(first_name + '-' + last_name, { lower: true, strict: true });


    // Verifica se è una richiesta di solo controllo dell'email
    if (emailOnly) {
        const checkEmailSql = "SELECT id FROM doctors WHERE email = ?";
        connection.query(checkEmailSql, [emailOnly], (err, emailResult) => {
            if (err) {
                console.log('Errore durante la verifica dell\'email:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const emailExists = emailResult.length > 0;
            return res.json({ exists: emailExists });
        });
        return;
    }

    // Verifica se è una richiesta di solo controllo del telefono
    if (phoneOnly) {
        const checkPhoneSql = "SELECT id FROM doctors WHERE phone = ?";
        connection.query(checkPhoneSql, [phoneOnly], (err, phoneResult) => {
            if (err) {
                console.log('Errore durante la verifica del telefono:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const phoneExists = phoneResult.length > 0;
            return res.json({ exists: phoneExists });
        });
        return;
    }

    // Validazioni

    // Campi obbligatori
    if (!id_specialization || !first_name || !last_name || !email || !phone || !address || !description || !gender) {
        return res.status(400).json({ status: "error", message: "Tutti i campi sono obbligatori" });
    }

    // Validazione del nome
    if (typeof first_name !== 'string' || first_name.trim().length < 3) {
        return res.status(400).json({ status: 'fail', message: 'Il nome deve avere più di 3 caratteri' });
    }

    // Validazione del cognome
    if (typeof last_name !== 'string' || last_name.trim().length < 3) {
        return res.status(400).json({ status: 'fail', message: 'Il cognome deve avere più di 3 caratteri' });
    }

    // Validazione descrizione
    if (typeof description !== 'string' || description.trim().length < 6) {
        return res.status(400).json({ status: 'fail', message: 'La descrizione deve avere più di 6 caratteri' });
    }

    // Verifica se il numero di telefono è valido
    const phoneRegex = /^\+?[0-9]{1,15}$/;
    if (!phoneRegex.test(phone)) {
        console.log('Validazione numero di telefono fallita:', phone);
        return res.status(400).json({ status: "error", message: "Il numero di telefono non è valido." });
    }

    // Validazione indirizzo
    if (typeof address !== 'string' || address.trim().length < 5) {
        console.log('Validazione indirizzo fallita:', address);
        return res.status(400).json({ status: 'fail', message: "L'indirizzo deve avere più di 5 caratteri" });
    }

    // Verifica se l'email è valida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Validazione email fallita:', email);
        return res.status(400).json({ status: "error", message: "La mail inserita non è valida" });
    }

    // Verifica se il numero di telefono già esiste
    const checkPhoneSql = "SELECT id FROM doctors WHERE phone = ?";
    connection.query(checkPhoneSql, [phone], (err, phoneResult) => {
        if (err) {
            console.log('Errore durante la verifica del telefono:', err.message);
            return next(new Error(err.message));
        }

        if (phoneResult.length > 0) {
            return res.status(400).json({ status: "error", message: "Numero di telefono già registrato" });
        }

        // Verifica se l'email già esiste
        const checkEmailSql = "SELECT id FROM doctors WHERE email = ?";
        connection.query(checkEmailSql, [email], (err, emailResult) => {
            if (err) {
                console.log('Errore durante la verifica dell\'email:', err.message);
                return next(new Error(err.message));
            }

            if (emailResult.length > 0) {
                return res.status(400).json({ status: "error", message: "Email già registrata" });
            }

            // Se i campi sono validi e l'email e il telefono non sono registrati procede con la query di creazione
            const sql = `
                INSERT INTO doctors (id_specialization, first_name, last_name, email, phone, address, image, gender, description, slug) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            connection.query(sql, [id_specialization, first_name, last_name, email, phone, address, image, gender, description, slug], (err, result) => {
                if (err) {
                    console.error('Errore durante la creazione del dottore:', err.message);
                    return next(new Error("Errore durante la creazione del dottore"));
                }

                console.log('Dottore creato con successo:', result.insertId);
                res.status(201).json({ status: "success", message: "Dottore creato con successo", id: result.insertId, slug: slug });
            });
        });
    });
}




export default {
    getDoctors,
    getSingleDoctor,
    createDoctor
};

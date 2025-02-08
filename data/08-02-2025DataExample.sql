INSERT INTO dottori (id_specializzazione, nome, cognome, email, telefono, indirizzo, immagine, slug) VALUES
-- Cardiologia (3 nuovi dottori)
(1, 'Francesco', 'Russo', 'francesco.russo@example.com', '3336789012', 'Via Verdi 10, Milano', 'francesco_russo.jpg', 'francesco-russo'),
(1, 'Alessandra', 'Conti', 'alessandra.conti@example.com', '3337890123', 'Via Mazzini 15, Roma', 'alessandra_conti.jpg', 'alessandra-conti'),
(1, 'Davide', 'Martini', 'davide.martini@example.com', '3338901234', 'Piazza Cavour 8, Torino', 'davide_martini.jpg', 'davide-martini'),

-- Dermatologia (3 nuovi dottori)
(2, 'Sara', 'Rinaldi', 'sara.rinaldi@example.com', '3339012345', 'Via San Marco 9, Bologna', 'sara_rinaldi.jpg', 'sara-rinaldi'),
(2, 'Giulia', 'Ferrari', 'giulia.ferrari@example.com', '3330123456', 'Via Donizetti 4, Firenze', 'giulia_ferrari.jpg', 'giulia-ferrari'),
(2, 'Federico', 'Romani', 'federico.romani@example.com', '3331234567', 'Via Leopardi 2, Bari', 'federico_romani.jpg', 'federico-romani'),

-- Pediatria (4 nuovi dottori)
(3, 'Marco', 'Basile', 'marco.basile@example.com', '3332345678', 'Via Colonna 1, Napoli', 'marco_basile.jpg', 'marco-basile'),
(3, 'Elisa', 'Greco', 'elisa.greco@example.com', '3333456789', 'Via Alfieri 7, Venezia', 'elisa_greco.jpg', 'elisa-greco'),
(3, 'Stefano', 'D’Amico', 'stefano.damico@example.com', '3334567890', 'Corso Garibaldi 12, Palermo', 'stefano_damico.jpg', 'stefano-damico'),
(3, 'Marta', 'Lombardi', 'marta.lombardi@example.com', '3335678901', 'Via Vivaldi 11, Genova', 'marta_lombardi.jpg', 'marta-lombardi'),

-- Ortopedia (5 nuovi dottori)
(4, 'Antonio', 'Esposito', 'antonio.esposito@example.com', '3336789012', 'Corso Vercelli 3, Torino', 'antonio_esposito.jpg', 'antonio-esposito'),
(4, 'Veronica', 'De Luca', 'veronica.deluca@example.com', '3337890123', 'Via Rossini 8, Bari', 'veronica_deluca.jpg', 'veronica-deluca'),
(4, 'Lorenzo', 'Santoro', 'lorenzo.santoro@example.com', '3338901234', 'Via Puccini 5, Firenze', 'lorenzo_santoro.jpg', 'lorenzo-santoro'),
(4, 'Chiara', 'Morelli', 'chiara.morelli@example.com', '3339012345', 'Via Marconi 10, Milano', 'chiara_morelli.jpg', 'chiara-morelli'),
(4, 'Gabriele', 'Cattaneo', 'gabriele.cattaneo@example.com', '3330123456', 'Via Carducci 6, Roma', 'gabriele_cattaneo.jpg', 'gabriele-cattaneo'),

-- Ginecologia (5 nuovi dottori)
(5, 'Claudia', 'Sartori', 'claudia.sartori@example.com', '3331234567', 'Via Manzoni 9, Venezia', 'claudia_sartori.jpg', 'claudia-sartori'),
(5, 'Matteo', 'Leone', 'matteo.leone@example.com', '3332345678', 'Corso Italia 14, Firenze', 'matteo_leone.jpg', 'matteo-leone'),
(5, 'Serena', 'Barone', 'serena.barone@example.com', '3333456789', 'Piazza Dante 3, Napoli', 'serena_barone.jpg', 'serena-barone'),
(5, 'Giovanna', 'Parisi', 'giovanna.parisi@example.com', '3334567890', 'Via Petrarca 2, Palermo', 'giovanna_parisi.jpg', 'giovanna-parisi'),
(5, 'Riccardo', 'Marini', 'riccardo.marini@example.com', '3335678901', 'Via Bellini 12, Bologna', 'riccardo_marini.jpg', 'riccardo-marini');

-- RECENSIONI
INSERT INTO recensioni (id_dottore, nome_paziente, voto, testo) VALUES
-- Dottore 6 (Francesco Russo, Cardiologia): 3 recensioni
(391, 'Alberto Riva', 5, 'Ottimo professionista, ha risolto il mio problema con grande competenza.'),
(391, 'Giada Fabbri', 4, 'Molto preparato, ma l’attesa è stata un po’ lunga.'),
(392, 'Leonardo Fontana', 5, 'Gentile e scrupoloso, mi sono trovato benissimo.'),

-- Dottore 7 (Alessandra Conti, Cardiologia): 2 recensioni
(392, 'Simona Caruso', 4, 'Cortese e disponibile, ottima esperienza.'),
(392, 'Paolo Marinelli', 3, 'Brava, ma avrei preferito spiegazioni più dettagliate.'),

-- Dottore 8 (Davide Martini, Cardiologia): 1 recensione
(393, 'Francesca Lodi', 5, 'Molto professionale, lo consiglio vivamente.'),

-- Dottore 9 (Sara Rinaldi, Dermatologia): 3 recensioni
(394, 'Michele Grandi', 5, 'Competente e disponibile, sono rimasto soddisfatto.'),
(394, 'Elena Ferrari', 4, 'Servizio ottimo, ma lo studio è un po’ datato.'),
(394, 'Anna Ricci', 5, 'Ha risolto il mio problema in tempi rapidi. Consigliatissima!'),

-- Dottore 10 (Giulia Ferrari, Dermatologia): 1 recensione
(395, 'Marco Ferri', 4, 'Molto preparata, ma un po’ frettolosa.'),

-- Dottore 11 (Federico Romani, Dermatologia): 0 recensioni

-- Dottore 12 (Marco Basile, Pediatria): 2 recensioni
(397, 'Valeria De Rossi', 5, 'Pediatra fantastico, il mio bambino lo adora.'),
(397, 'Stefano Valli', 4, 'Molto bravo, ma difficile prenotare un appuntamento.'),

-- Dottore 13 (Elisa Greco, Pediatria): 3 recensioni
(398, 'Chiara Villa', 5, 'Professionale e dolce con i bambini.'),
(398, 'Giorgio Pini', 3, 'Visita accurata, ma poco empatica.'),
(398, 'Lucia Fontana', 5, 'Esperienza ottima, dottoressa molto preparata.'),

-- Dottore 14 (Stefano D’Amico, Pediatria): 0 recensioni

-- Dottore 15 (Marta Lombardi, Pediatria): 1 recensione
(400, 'Raffaella Mancini', 4, 'Brava e disponibile, ma attesa lunga.'),

-- Dottore 16 (Antonio Esposito, Ortopedia): 4 recensioni
(401, 'Luca Piras', 5, 'Eccellente ortopedico, molto professionale.'),
(401, 'Ilaria Ferrero', 4, 'Ottima visita, ma lo studio era affollato.'),
(401, 'Davide Serra', 5, 'Ha risolto il mio problema al ginocchio in tempi record.'),
(401, 'Claudia Pini', 5, 'Cortese e molto preparato.'),

-- Dottore 17 (Veronica De Luca, Ortopedia): 2 recensioni
(402, 'Matteo Bianchi', 4, 'Molto preparata, ma un po’ sbrigativa.'),
(402, 'Sara Rossi', 5, 'Eccellente, sono molto soddisfatta del trattamento.'),

-- Dottore 18 (Lorenzo Santoro, Ortopedia): 1 recensione
(403, 'Andrea Fontana', 5, 'Grande professionalità, lo consiglio.'),

-- Dottore 19 (Chiara Morelli, Ortopedia): 0 recensioni

-- Dottore 20 (Gabriele Cattaneo, Ortopedia): 3 recensioni
(405, 'Daniela Colombo', 5, 'Ottimo ortopedico, sempre disponibile.'),
(405, 'Lorenzo Riva', 3, 'Competente, ma ho dovuto aspettare molto.'),
(405, 'Federica Marchi', 4, 'Brava, ma avrei preferito una spiegazione più chiara.'),

-- Dottore 21 (Claudia Sartori, Ginecologia): 2 recensioni
(406, 'Alice Martini', 5, 'Molto gentile e professionale.'),
(406, 'Giovanna Fabbri', 4, 'Buona esperienza, ma visita un po’ frettolosa.'),

-- Dottore 22 (Matteo Leone, Ginecologia): 1 recensione
(407, 'Silvia Rossi', 5, 'Ottima esperienza, medico molto preparato.'),

-- Dottore 23 (Serena Barone, Ginecologia): 4 recensioni
(408, 'Roberta Riva', 5, 'Eccellente ginecologa, sempre disponibile.'),
(408, 'Marco Neri', 2, 'Non mi ha convinto del tutto.'),
(408, 'Alessia Costa', 4, 'Molto brava, ma struttura da migliorare.'),
(408, 'Francesco Greco', 5, 'Medico scrupoloso e preparato.'),

-- Dottore 24 (Giovanna Parisi, Ginecologia): 0 recensioni

-- Dottore 25 (Riccardo Marini, Ginecologia): 1 recensione
(410, 'Lucia De Santis', 5, 'Ottimo ginecologo, molto rassicurante.');

-- COLONNA GENERE
ALTER TABLE dottori ADD COLUMN genere ENUM('M', 'F') NOT NULL AFTER indirizzo;

UPDATE dottori 
SET genere = CASE id
    WHEN 1 THEN 'M' -- Mario Rossi
    WHEN 2 THEN 'F' -- Laura Bianchi
    WHEN 3 THEN 'M' -- Giovanni Verdi
    WHEN 4 THEN 'F' -- Anna Neri
    WHEN 5 THEN 'M' -- Paolo Gialli
END
WHERE id IN (1, 2, 3, 4, 5);

-- ESEGUI DOPO
UPDATE dottori 
SET genere = CASE id
    WHEN 391 THEN 'M'  -- Francesco Russo
    WHEN 392 THEN 'F'  -- Alessandra Conti
    WHEN 393 THEN 'M'  -- Davide Martini
    WHEN 394 THEN 'F'  -- Sara Rinaldi
    WHEN 395 THEN 'F'  -- Giulia Ferrari
    WHEN 396 THEN 'M'  -- Federico Romani
    WHEN 397 THEN 'M'  -- Marco Basile
    WHEN 398 THEN 'F'  -- Elisa Greco
    WHEN 399 THEN 'M'  -- Stefano D’Amico
    WHEN 400 THEN 'F'  -- Marta Lombardi
    WHEN 401 THEN 'M'  -- Antonio Esposito
    WHEN 402 THEN 'F'  -- Veronica De Luca
    WHEN 403 THEN 'M'  -- Lorenzo Santoro
    WHEN 404 THEN 'F'  -- Chiara Morelli
    WHEN 405 THEN 'M'  -- Gabriele Cattaneo
    WHEN 406 THEN 'F'  -- Claudia Sartori
    WHEN 407 THEN 'M'  -- Matteo Leone
    WHEN 408 THEN 'F'  -- Serena Barone
    WHEN 409 THEN 'F'  -- Giovanna Parisi
    WHEN 410 THEN 'M'  -- Riccardo Marini
END
WHERE id BETWEEN 391 AND 410;

-- COLONNA DESCRIZIONE MEDICO (SERVIZI)
ALTER TABLE dottori ADD COLUMN descrizione TEXT AFTER genere;

UPDATE dottori 
SET descrizione = CASE id
    WHEN 1 THEN 'Specialista in Cardiologia. Offre consulenze per prevenzione cardiovascolare, trattamento di aritmie, ipertensione e insufficienza cardiaca.'
    WHEN 2 THEN 'Specialista in Dermatologia. Esperta in diagnosi e trattamento di patologie cutanee, allergie e malattie autoimmuni della pelle.'
    WHEN 3 THEN 'Pediatra con esperienza. Si occupa della salute e del benessere dei bambini, dalla nascita all’adolescenza.'
    WHEN 4 THEN 'Specialista in Ortopedia. Tratta patologie del sistema muscolo-scheletrico, tra cui fratture, artrosi e problemi posturali.'
    WHEN 5 THEN 'Specialista in Ginecologia. Esperto in salute femminile, gravidanza, fertilità e menopausa.'
END
WHERE id IN (1, 2, 3, 4, 5);

UPDATE dottori 
SET descrizione = CASE id
    WHEN 391 THEN 'Specialista in Cardiologia. Offre consulenze per la prevenzione di malattie cardiovascolari, monitoraggio dell’ipertensione e gestione delle aritmie.'
    WHEN 392 THEN 'Specialista in Dermatologia. Si occupa di trattare patologie della pelle, dai problemi estetici alle malattie autoimmuni cutanee.'
    WHEN 393 THEN 'Specialista in Pediatria. Esperto nella cura e gestione della salute infantile, prevenzione e trattamento di malattie pediatriche comuni.'
    WHEN 394 THEN 'Specialista in Dermatologia. Si occupa di diagnosi e trattamento di malattie della pelle, allergie, acne e altre patologie dermatologiche.'
    WHEN 395 THEN 'Specialista in Pediatria. Fornisce assistenza medica a bambini, trattando malattie comuni e monitorando lo sviluppo fisico e psicologico.'
    WHEN 396 THEN 'Specialista in Ortopedia. Si occupa di malattie e infortuni del sistema muscolo-scheletrico, tra cui fratture e patologie articolari.'
    WHEN 397 THEN 'Specialista in Ginecologia. Esperta nella salute femminile, con un focus su gravidanza, fertilità e trattamenti ormonali.'
    WHEN 398 THEN 'Specialista in Dermatologia. Offre trattamenti per diverse condizioni dermatologiche, dalle allergie a interventi più complessi come il trattamento del melanoma.'
    WHEN 399 THEN 'Specialista in Ortopedia. Tratta traumi, patologie articolari e problemi muscolari, garantendo una riabilitazione completa per i pazienti.'
    WHEN 400 THEN 'Specialista in Ginecologia. Si occupa di tutte le problematiche relative alla salute sessuale e riproduttiva femminile.'
    WHEN 401 THEN 'Specialista in Cardiologia. Fornisce trattamenti avanzati per malattie cardiache, monitoraggio e interventi per problemi vascolari e aritmiche.'
    WHEN 402 THEN 'Specialista in Pediatria. Assiste bambini e adolescenti, occupandosi di diagnosi, prevenzione e trattamenti per tutte le patologie pediatriche.'
    WHEN 403 THEN 'Specialista in Ortopedia. Si occupa di problematiche ortopediche legate a ossa, articolazioni, muscoli e tendini.'
    WHEN 404 THEN 'Specialista in Dermatologia. Fornisce trattamenti per condizioni della pelle come dermatiti, eczema, psoriasi e altre malattie dermatologiche.'
    WHEN 405 THEN 'Specialista in Ginecologia. Si specializza nella cura della salute riproduttiva, prevenzione, diagnosi e trattamenti di malattie femminili.'
    WHEN 406 THEN 'Specialista in Cardiologia. Si occupa di trattare e monitorare condizioni cardiache, tra cui malattia coronarica e insufficienza cardiaca.'
    WHEN 407 THEN 'Specialista in Dermatologia. Diagnostica e cura disturbi della pelle come acne, psoriasi, melanomi e altre malattie della pelle.'
    WHEN 408 THEN 'Specialista in Pediatria. Fornisce cure preventive, consulenze per malattie infettive e crescita dei bambini.'
    WHEN 409 THEN 'Specialista in Ortopedia. Si occupa di fratture ossee, malformazioni scheletriche, e offre trattamenti riabilitativi post-operatori.'
    WHEN 410 THEN 'Specialista in Ginecologia. Tratta tutte le problematiche relative alla salute delle donne, inclusi disturbi mestruali, menopausa e infertilità.'
END
WHERE id BETWEEN 391 AND 410;


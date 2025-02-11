-- Rinomina colonne :

-- dottori
ALTER TABLE dottori RENAME COLUMN descrizione TO description;
ALTER TABLE dottori RENAME COLUMN immagine TO image;
ALTER TABLE dottori RENAME COLUMN genere TO gender;
ALTER TABLE dottori RENAME COLUMN id_specializzazione TO id_specialization;

-- specializazioni
ALTER TABLE specializzazioni RENAME COLUMN nome TO name;

-- recensioni
ALTER TABLE recensioni  RENAME COLUMN id_dottore TO id_doctor;
ALTER TABLE recensioni  RENAME COLUMN nome_paziente TO patient_name;
ALTER TABLE recensioni  RENAME COLUMN voto TO rating;
ALTER TABLE recensioni  RENAME COLUMN testo TO content;

-- Aggiunge colonna email nelle recensioni
ALTER TABLE recensioni ADD COLUMN email VARCHAR(255) NOT NULL;

-- tuple email generate (VERIFICARE ID SUL DB)
UPDATE recensioni SET email = 'amelia.greenwood@example.com' WHERE id = 1;
UPDATE recensioni SET email = 'luca.martelli@example.com' WHERE id = 2;
UPDATE recensioni SET email = 'aurora.borealis@example.com' WHERE id = 3;
UPDATE recensioni SET email = 'lorenzo.vinci@example.com' WHERE id = 4;
UPDATE recensioni SET email = 'isabella.rossini@example.com' WHERE id = 5;
UPDATE recensioni SET email = 'giacomo.falcone@example.com' WHERE id = 6;
UPDATE recensioni SET email = 'elena.belvedere@example.com' WHERE id = 7;
UPDATE recensioni SET email = 'raffaele.catalano@example.com' WHERE id = 8;
UPDATE recensioni SET email = 'chiara.montagna@example.com' WHERE id = 9;
UPDATE recensioni SET email = 'federico.marini@example.com' WHERE id = 10;
UPDATE recensioni SET email = 'sofia.leggeri@example.com' WHERE id = 11;
UPDATE recensioni SET email = 'leonardo.benedetti@example.com' WHERE id = 12;
UPDATE recensioni SET email = 'matilde.trevino@example.com' WHERE id = 13;
UPDATE recensioni SET email = 'alessio.baldini@example.com' WHERE id = 14;
UPDATE recensioni SET email = 'beatrice.ferrari@example.com' WHERE id = 15;
UPDATE recensioni SET email = 'alberto.pellegrini@example.com' WHERE id = 16;
UPDATE recensioni SET email = 'gemma.moretti@example.com' WHERE id = 17;
UPDATE recensioni SET email = 'ettore.grimaldi@example.com' WHERE id = 18;
UPDATE recensioni SET email = 'carlotta.volpi@example.com' WHERE id = 19;
UPDATE recensioni SET email = 'marcello.lombardi@example.com' WHERE id = 20;
UPDATE recensioni SET email = 'valentina.serra@example.com' WHERE id = 21;
UPDATE recensioni SET email = 'davide.fontana@example.com' WHERE id = 22;
UPDATE recensioni SET email = 'giulia.rubino@example.com' WHERE id = 23;
UPDATE recensioni SET email = 'andrea.pagliari@example.com' WHERE id = 24;
UPDATE recensioni SET email = 'marta.santini@example.com' WHERE id = 25;
UPDATE recensioni SET email = 'alice.rivers@example.com' WHERE id = 26;
UPDATE recensioni SET email = 'carlo.mancini@example.com' WHERE id = 27;
UPDATE recensioni SET email = 'diana.castelli@example.com' WHERE id = 28;
UPDATE recensioni SET email = 'tommaso.bosco@example.com' WHERE id = 29;
UPDATE recensioni SET email = 'francesca.gabbana@example.com' WHERE id = 30;
UPDATE recensioni SET email = 'marco.ruggeri@example.com' WHERE id = 31;
UPDATE recensioni SET email = 'giulia.ferrero@example.com' WHERE id = 32;
UPDATE recensioni SET email = 'andrea.napolitano@example.com' WHERE id = 33;
UPDATE recensioni SET email = 'paola.musso@example.com' WHERE id = 34;
UPDATE recensioni SET email = 'riccardo.bellini@example.com' WHERE id = 35;
UPDATE recensioni SET email = 'sara.verdi@example.com' WHERE id = 36;
UPDATE recensioni SET email = 'nicolò.morini@example.com' WHERE id = 37;
UPDATE recensioni SET email = 'anna.palermo@example.com' WHERE id = 38;
UPDATE recensioni SET email = 'massimo.fiore@example.com' WHERE id = 39;
UPDATE recensioni SET email = 'elisa.fabbri@example.com' WHERE id = 40;



-- Rinomina tabelle
RENAME TABLE dottori TO doctors;
RENAME TABLE specializzazioni TO specializations;
RENAME TABLE recensioni TO reviews;


-- modificare valore di genere in enum
ALTER TABLE doctors MODIFY COLUMN gender ENUM('M', 'F', 'X') NOT NULL;
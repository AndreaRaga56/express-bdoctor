-- Aggiunge colonna slug

ALTER TABLE dottori ADD COLUMN slug VARCHAR(255);

UPDATE `bdoctor_db`.`dottori` SET `slug` = 'mario-rossi' WHERE (`id` = '1');
UPDATE `bdoctor_db`.`dottori` SET `slug` = 'laura-bianchi' WHERE (`id` = '2');
UPDATE `bdoctor_db`.`dottori` SET `slug` = 'giovanni-verdi' WHERE (`id` = '3');
UPDATE `bdoctor_db`.`dottori` SET `slug` = 'anna-neri' WHERE (`id` = '4');
UPDATE `bdoctor_db`.`dottori` SET `slug` = 'paolo-gialli' WHERE (`id` = '5');
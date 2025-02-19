UPDATE doctors
JOIN specializations ON doctors.id_specialization = specializations.id
SET doctors.description = 
    CASE specializations.name
        WHEN 'Cardiologia' THEN 'Specialista in Cardiologia. Esperto nella diagnosi e trattamento delle malattie cardiovascolari.<br> Servizi offerti:<ul><li>Visita cardiologica</li><li>Elettrocardiogramma (ECG)</li><li>Ecocardiogramma</li><li>Holter cardiaco (24h/48h)</li><li>Test da sforzo</li><li>Monitoraggio della pressione arteriosa</li><li>Trattamento delle aritmie</li><li>Diagnosi e trattamento delle malattie coronariche</li></ul>'
        WHEN 'Ortopedia' THEN 'Specialista in Ortopedia. Esperto nella diagnosi e trattamento delle patologie muscolo-scheletriche.<br>Servizi offerti:<ul><li>Visita ortopedica</li><li>Radiografia</li><li>Risonanza magnetica (RMN)</li><li>Ecografia muscolo-scheletrica</li><li>Infiltrazioni articolari</li><li>Trattamento delle fratture</li><li>Riabilitazione post-operatoria</li><li>Terapia del dolore</li></ul>'
        WHEN 'Pediatria' THEN 'Specialista in Pediatria. Esperto nella cura e gestione della salute infantile, prevenzione e trattamento di malattie pediatriche comuni. <br>Servizi offerti:<ul><li>Visita pediatrica</li><li>Controlli di crescita e sviluppo</li><li>Vaccinazioni</li><li>Consulenze nutrizionali</li><li>Trattamento delle malattie infantili comuni</li><li>Diagnosi e gestione delle allergie</li><li>Monitoraggio dello sviluppo psicomotorio</li><li>Consulenze per l\'allattamento</li></ul>'
        WHEN 'Dermatologia' THEN 'Specialista in Dermatologia. Esperto nella diagnosi e trattamento delle malattie della pelle. <br>Servizi offerti:<ul><li>Visita dermatologica</li><li>Dermatoscopia</li><li>Biopsia cutanea</li><li>Crioterapia</li><li>Trattamento dell\'acne</li><li>Rimozione di nevi e cisti</li><li>Trattamento delle malattie della pelle</li><li>Terapia fotodinamica</li></ul>'
        WHEN 'Ginecologia' THEN 'Specialista in Ginecologia. Esperto nella salute riproduttiva e nella cura delle patologie ginecologiche.<br> Servizi offerti:<ul><li>Visita ginecologica</li><li>Pap test</li><li>Ecografia pelvica</li><li>Monitoraggio della gravidanza</li><li>Consulenze sulla contraccezione</li><li>Diagnosi e trattamento delle infezioni vaginali</li><li>Menopausa e terapia ormonale</li><li>Trattamento delle malattie ginecologiche</li></ul>'
        ELSE doctors.description
    END;

UPDATE `bdoctor-db`.`doctors` SET `address` = 'Via Torino, 1, 20123 Milano MI, Italia' WHERE (`id` = '1');
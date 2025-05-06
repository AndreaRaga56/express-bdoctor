# ⚡ BDoctors – Backend API

Questa è l'API backend di **BDoctors**, sviluppata con **Express.js**, che gestisce dottori, specializzazioni e recensioni. Fornisce tutte le funzionalità necessarie per supportare il frontend, inclusa l'autenticazione, la validazione e l'upload delle immagini.

## 🚀 Funzionalità principali

- 👨‍⚕️ **Gestione Dottori**: Creazione, visualizzazione e aggiornamento dei profili dei medici
- 🏷️ **Gestione Specializzazioni**: Elenco aggiornato delle specializzazioni disponibili
- ⭐ **Gestione Recensioni**: I pazienti possono lasciare valutazioni e commenti
- 🔐 **Autenticazione e Sicurezza**: Validazione input, middleware per la protezione dei dati
- 🖼️ **Upload Immagini**: Caricamento immagini profilo per i medici

---

## 📌 API Endpoints

| Metodo | Endpoint            | Descrizione                                 |
|--------|---------------------|---------------------------------------------|
| GET    | `/doctors`          | Restituisce la lista di tutti i dottori     |
| POST   | `/doctors`          | Registra un nuovo dottore                   |
| GET    | `/specializations`  | Elenco di tutte le specializzazioni         |
| POST   | `/reviews`          | Crea una recensione per un dottore          |
| GET    | `/doctors/:id`      | Dettagli di un dottore specifico            |

---

## ❌ Gestione Errori

L'API include una gestione degli errori centralizzata per:

- `404 Not Found`: Rotta inesistente
- `500 Internal Server Error`: Errore lato server
- `400 Bad Request`: Input non valido (es. email errata, campi mancanti)

---

## 🛠️ Stack Tecnologico

- **Linguaggio:** JavaScript (Node.js)
- **Framework:** Express.js
- **Database:** MySQL
- **Altre dipendenze:** Multer (upload immagini), dotenv

---
import mysql from "mysql2";

// Crea una connessione al database MySQL utilizzando i parametri di ambiente
const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
// Connette al database e gestisce eventuali errori
connection.connect((err)=>{
    if(err)throw err;
    console.log("MySql connesso")
});

export default connection;

06-02
1.Creazione del progetto BE con Express

2.Definite risorse Dottori, Specializzazioni, Recensioni

3.Implementazione della Api 
 .index, show e create per la risorsa dottori
 .index e create per la risorsa recensioni
 .index per la risorsa specializzazioni

 --------------

07-02

1.Gestioni degli errori
  .rotta non trovata
  .errore interno del server

2.Validazione input per le rotte create
  .esiste già nel sistema un utente con l’email inserita
  .la mail inserita non è una mail valida
  .il nome è inferiore a 3 lettere
  .il cognome è inferiore a 3 lettere
  .uno dei campi è vuoto
  .l’indirizzo è inferiore a 5 lettere
  .il numero di telefono contiene lettere o simboli diversi da “+”
  .“+”, se presente, deve essere all’inizio
  .il voto deve essere un numero da 1 a 5

3.Sostituito slug all'id per ottimizzazione per i motori di ricerca

4.inserito file upload per definire le impostazioni di salvaggio file


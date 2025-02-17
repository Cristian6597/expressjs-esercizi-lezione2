import express from 'express';
import fs from 'fs';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/frase', (req, res) => {
    try {
        //Prendo il dbjson lo legge e lo parsa per poterlo utilizzare
        let dbText = fs.readFileSync('./db.json');
        let dbJson = JSON.parse(dbText);

        // Sceglie una frase casuale dal db
        const randomIndex = Math.floor(Math.random() * dbJson.frase.length); //prende casualmente un elemento dal db con Math.random, Math.floor server per arrotondare il numero scelto
        const randomFrase = dbJson.frase[randomIndex];

        return res.json(randomFrase); //mi restituisce la frase
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Errore server' }); //gestisce lo status 500 del server
    }
});

app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
});

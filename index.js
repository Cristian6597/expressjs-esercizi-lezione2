import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

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

app.get('/new-frase', (req,res) => {
    try {
        const {quote} = req.query //estrae le quotes dalla query
        const dbText = fs.readFileSync('./db.json'); //le legge
        const dbJson = JSON.parse(dbText); //le parsa
        dbJson.frase.push({ quote }); //aggiunge una nuova quote
        fs.writeFileSync('./db.json', JSON.stringify(dbJson)); //aggiunge al db
        return res.json(dbJson);
        
    } catch (error) {
        console.log(error, "errore durante l'inserimento dei dati")
    }
})

//da fixare
app.post('/frase', (req, res) =>{ 
    try {
        const {quote} = req.body;
        const dbText = fs.readFileSync('./db.json');
        const dbJson = JSON.parse(dbText);
        dbJson.frase.push({ quote });
        fs.writeFileSync('./db.json', JSON.stringify(dbJson));
        return res.json(dbJson);
        
    } catch (error) {
        console.log(error)
    }
})

//convertitore di km in miglia, scrivere nel url http://localhost:3000/converter?k=10

app.get('/converter', (req,res) => {
    try {
        const {k} = req.query //estrae le quotes dalla query
        const km = parseFloat(k);
        const miglia = km * 0.6
        return res.json({ miglia });
        
    } catch (error) {
        console.log(error, "errore durante l'inserimento dei dati")
    }
})

//legge i parametri e ridà la somma 
//http://localhost:3000/somma?numero1=10&numero2=11

app.get('/somma', (req,res) => {
    try {
        const {numero1 ,numero2} = req.query; //estrae le quotes dalla query
        const a = parseFloat(numero1);
        const b = parseFloat(numero2);
        const somma = a + b
        return res.json({ somma, a, b });
        
    } catch (error) {
        console.log(error, "errore durante l'inserimento dei dati")
    }
})

app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
});


const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
   host: 'localhost',
   port: 3307,
   user: 'root',
   password: '',
   database: 'raktar_db'
});

app.get('/termekek', (req, res) => {
   const query = `
       SELECT t.id, t.kategoria_id, t.nev, t.ar, t.keszlet, t.elerheto, k.nev AS kategoria_nev ...`;
   db.query(query, (err, results) => {
       if (err) {
           res.status(500).json({ hiba: "Üzenet" });
           return;
       }
       res.json(results);
   });
});


app.get('/termekek/elerheto', (req, res) => {
   const query = "SELECT * FROM termekek WHERE elerheto = 1 AND keszlet > 0";
   db.query(query, (err, results) => {
       if (err) {
           res.status(500).json({ hiba: "Üzenet" });
           return;
       }
       res.json(results);
   });
});

app.get('/termekek/kereses/:szoveg', (req, res) => {
   const szoveg = `%${req.params.szoveg}%`;
   const query = "SELECT * FROM termekek WHERE nev LIKE ?";
   db.query(query, [szoveg], (err, results) => {
       if (err) {
           res.status(500).json({ hiba: "Üzenet" });
           return;
       }
       res.json(results);
   });
});

app.get('/kategoriak/statisztika', (req, res) => {
    const query = "";
    db.query(query, [szoveg], (err, results) => {
        if (err) {
            res.status(500).json({ hiba: "Üzenet" });
            return;
        }
        res.json(results);
    });
 });

app.get('/termekek/dragak', (req, res) => {
   const query = "SELECT nev, ar, keszlet FROM termekek WHERE ar > 10000 ORDER BY keszlet DESC";
   db.query(query, (err, results) => {
       if (err) {
           res.status(500).json({ hiba: "Üzenet" });
           return;
       }
       res.json(results);
   });
});

app.listen(3000, () => {
    console.log("A szerver fut a 3000es porton");
}); 
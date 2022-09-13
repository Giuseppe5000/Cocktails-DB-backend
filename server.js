const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

const db = new sqlite3.Database('./cocktails.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log(err);
    }
});

app.get('/api/name/:name', (req, res) => {

    let name = req.params.name;
    let results = []

    db.all(`SELECT IDCocktail, Name, Instructions, Ingredients, Thumb FROM Cocktails WHERE Name LIKE ?`, `%${name}%`, (err, rows) => {
        rows.forEach(row => {
            results.push(row)
        });
        res.json({data: results})
    });
    
});

app.get('*', (req, res) => {
    res.send('404');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

connection.connect();


const app = express();
const port = process.env.PORT || 3000;

app.get('/api/name/:name', (req, res) => {
    let name = req.params.name;
    let results = []

    connection.query(`SELECT IDCocktail, Name, Instructions, Ingredients, Thumb FROM Cocktails WHERE Name LIKE ?`, [`%${name}%`], (err, rows, fields) => {
        rows.forEach(row => {
            results.push(row);
        });
        res.json({ data: results })
    })

});

app.get('*', (req, res) => {
    res.send('404');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

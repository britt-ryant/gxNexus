const router = require("express").Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"Shsid107001!",
    database: 'GxNexus'
})


router.post('/deletedEntry', (req, res) => {
    console.log(`adding the deleted entry`);
    const {entry, tableName} = req.body;

    entry.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //console.log(req.body)
})


module.exports = router;
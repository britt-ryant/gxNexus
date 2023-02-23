const router = require("express").Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"Shsid107001!",
    database: 'GxNexus'
})


//This is the router for directly manipulating the db info once it is stored

router.get('/apple/pie', (req, res) => {
    console.log(`route is connected`);
    res.send({"express": "Have a Slice of blueberry"})
})


router.get('/:tableName', (req, res) => {
    console.log(`in here`, req.params)
    const {tableName} = req.params;
    const dbQuery = `Call getAllInfo(?)`;
    db.query(dbQuery, tableName, (error, response) => {
        if(error){
            console.log(`there was an error retrieveing the data`, error);
            res.send({error: true, message: `There was an error getting the data`})
        } else {
            //console.log(response[0])
            res.send(response);
        }
    })
});

router.put('/update', (req, res) => {
    const {id, column, newCellData, tableName} = req.body.data;
    const datatype = typeof newCellData;
    const dbQuery = `Call updateCells(?,?,?,?,?)`;
    db.query(dbQuery, [tableName, column, newCellData, datatype, id], (error, response) => {
        if(error){
            console.log(error, 'There was an error updating the cell');
            res.send({Error: true, message: 'There was an error updating the cell'})
        } else {
            res.send(response)
        }
    })
    console.log(id, column, newCellData, tableName, datatype);
})

router.get('/:tableName/:id', (req, res) => {
    const {tableName, id} = req.params;
    console.log(req.params)
    const dbQuery = `CALL deleteEntry(?, ?)`;
    db.query(dbQuery, [id, tableName], (error, response) => {
        if(error){
            res.send({error: true, message: `there was an error deleting the user, check server console`})
        } else {
            res.send(response);
        }
    })
});


router.get('/get/:tableName/:assessmentName', (req, res) => {
    const {tableName, assessmentName} = req.params;
    const dbQuery = `CALL assessmentScore('${tableName}', '${assessmentName}')`;
    db.query(dbQuery, (error, response) => {
        if(error){
            console.log(error)
            res.send({error: true, message: 'Cannot find that assessment name'})
        } else {
            res.send(response)
        }
    })
})


module.exports = router;
const router = require('express').Router();
const mysql = require('mysql2');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const { V1: uuidv1, V4: uuidv4} = require('uuid');
const {randomUUID} = require('crypto');

//this router is for uploading excel sheet to db 

//****IN PROGRESS ******/

//router still needs error handling for both incorrect file type and for a spreadsheet that contains only column names
//logic uses first data entry to determine datatype for each column


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"Shsid107001!",
    database: 'GxNexus'
})

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage: storage});

router.post('/upload', upload.single('myfile'), (req, res) => {
    const {file} = req
    if(!file){
        res.send({error: true, message: "Please make sure there is a file uploaded!"})
    }
    readXlsxFile(file.path).then((rows)=> {
        if(rows.length <= 1 ){
            res.send({error: true, message: "The table you are trying to upload does not contain any data, please upload a populated table."})
        } else {
            let columns = rows[0];
            rows.shift();
            columnType = [];
            rows[0].map(element => {
                columnType.push(typeof element);
            });
            let fileName = file.originalname;
        createTable(columns, columnType, rows, fileName, res)
        }
    })

})

const createTable = (columns, columnType, rows, fileName, res) => {
    let convertedDataTypes = []
    columnType.forEach(element => {
        switch(element){
            case "string":
                convertedDataTypes.push("VARCHAR(100)");
                break;
            case "number":
                convertedDataTypes.push("INT");
                break;
            case "object":
                convertedDataTypes.push("DATETIME");
                break;
            default:
                convertedDataTypes.push("VARCHAR(100)");
        }      
    });
    let newFormat = columns.map((e, i) => e + " " + convertedDataTypes[i]);

    //create two table names one for display of data and one for tracking
    let tableName = `${fileName.replace(".", '') + Date.now()}`;
    let deleteTableName = `${tableName}_trace`; 

    //Adjust rows to add an ID and a timestamp
    rows.forEach((row) => {
        row.unshift(new Date().toISOString().slice(0, 19).replace('T', ' '));
        row.unshift(randomUUID());
    })

    //execute trace table creation and add unique columns
    // queries(deleteTableName, newFormat, rows).then((data) => {
    //     new Promise ((resolve, reject) => {
    //         db.query(`CALL addColumns('${data}', 'Active TINYINT')`, (error, response) => {
    //             if(error){
    //                 return reject(error)
    //             } else {
    //                 console.log(`column added to the trace table`)
    //                 return resolve({tableName: deleteTableName, columnName: "Active", newCellData: 1, dataType: "number"})
    //             }
    //         })
    //     }).then((data) => {
    //         console.log(data)
    //         rows.forEach((row) => {
    //              db.query(`CALL updateCells('${data.tableName}', '${data.columnName}', '${data.newCellData}', '${data.dataType}', '${row[0]}')`, (error, response) => {
    //                 if(error){
    //                     console.log(error)
    //                 } else {
    //                     return response
    //                 }
    //              })
    //         })
    //     })
    // })

    //execute table creation for display data
    queries(tableName, newFormat, rows, columns).then((data) => {
        console.log(data, tableName)
        columns.unshift("Timestamp");
        columns.unshift("Id")
        res.send({tableName: tableName, columns: columns})
    })
    // Promise.all([
    //     createTableColumns(tableName),
    //     addUniqueColumns(tableName, newFormat),
    //     addTableData(tableName, rows)
    // ]).then((data) => {
    //     console.log(`send response now`, data);
    //     res.send({tableName, columns})
    // })
}


const createTableColumns = (tableName) => {
    return new Promise((resolve, reject) => {
        db.query(`CALL createTable('${tableName}')`, (error, response) => {
            if(error){
                return reject(error)
            }
            return resolve(response);
        })
    })
}
const addUniqueColumns = (tableName, newFormat) => {
    return new Promise((resolve, reject) => {
        newFormat.forEach((item) => {
            db.query(`CALL addColumns('${tableName}', '${item}')`, (error, response) => {
                if(error){ 
                    return reject(error)
                }
                return resolve(response)
            })
        })
    })
}
const addTableData = (tableName, rows) => {
    return new Promise((resolve, reject) => {
        rows.forEach((row) => {
            // row.unshift(new Date().toISOString().slice(0, 19).replace('T', ' '));
            // row.unshift(randomUUID());
            db.query(`INSERT INTO ${tableName} VALUES(?)`, [row], (error, response) => {
                if(error){
                    return reject(error)
                }
                //console.log(response)
                return resolve({response})
            })
        })
    })

}
async function queries(tableName, newFormat, rows){
    try{
        await createTableColumns(tableName)
        await addUniqueColumns(tableName, newFormat);
        await addTableData(tableName, rows)
        return tableName;
    } catch(error){
        console.log(error)
    }
}


module.exports = router;
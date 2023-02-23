const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const multer = require('multer');
const mysql = require('mysql2');
const uploadRoute = require('./Routes/uploadRoute');
const dbRoute = require('./Routes/dbRoute');
const trackingRoute = require('./Routes/trackingRoute');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

app.use('/excel', uploadRoute);
app.use('/data', dbRoute);
app.use('/trace', trackingRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running, listening on port ${port}`.green.bold));

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs')
const csv = require('fast-csv')
const cors = require('cors')
const mysql = require('mysql2')
const multer = require('multer')
const path = require('path')
const port = 3000
 
//use express static folder
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
 
// Database connection
const db = mysql.createConnection({
    host: "my-database-1-instance-1.czwhfi5uavam.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "g0disg00d",
    database: "main"
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

app.listen(port, () => console.log(`Pm learning project is listening on port ${port}!`));

app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
});

app.get('/status', (req, res) => {
    res.send({status: "I'm up and running"});
  });

app.get("/chart", (req, res) => {
    const query = 'SELECT age as urgency, id as importance FROM tasks';
    db.query(query, (err, result) => {
    // console.log(result);
    res.send(result);
    });
});


const upload = multer({ dest: 'uploads/' })
app.post('/uploadfile', upload.single('uploadfile'), (req, res) =>{
    console.log(req.file);
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database');
    // res.status(200).send("Successfully uploaded");
});

function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
  
            // Open the MySQL connection
            db.connect((error) => {
                if (error) {
                    console.error("DB err_________________" + error);
                } else {
                    let query = 'INSERT INTO tasks (name, urgency, importance) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
  
    stream.pipe(csvStream);
}
 
//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

//------------------------
//! Use of Multer
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
 
// var upload = multer({
//     storage: storage
// });

// //@type   POST
// // upload csv to database
// app.post('/uploadfile', upload.single('uploadfile'), (req, res) =>{
//     // console.log(req.file);
//     UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
//     console.log('CSV file data has been uploaded in mysql database ' + err);
// });

// // app.post('/uploadfile',upload.single('uploadfile'), function(req, res, next) {
// //     // req.file is the `uploadCsv` file 
// //     // req.body will hold the text fields, if there were any 
// //     console.log(req.file);
// //     // the buffer here containes your file data in a byte array 
// //     var csv=req.file.toString('utf8');
// // });


const mysql = require('mysql');
const express = require('express');
//express required as dependency in package.json but does not seem to be installed in the node_modules folder.
const bodyParser = require('body-parser');
//body-parser required as dependency in package.json but does not seem to be installed in the node_modules folder.
const app = express();
const port = 3000;

app.use(bodyParser.json());

// var mysqlConnection = mysql.createConnection({
//       host : 'mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//       user : 'jgy4kfpqhzeplmwl',
//   password : 'nal168vbk5cgeq50',
//   database : 'b0j93g47mct78nva'
// })

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
password : 'root',
database : 'bookstore'
})

mysqlConnection.connect((err) => {
  if (!err)
  console.log('DB connection succeded');
  else
  console.log ('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

// // Show in CLI:
// app.get('/showbooks',(res,req) => {
//   mysqlConnection.query('SELECT * FROM books',(err, rows, fields) => {
//     if(!err)
//     // Show entire table:
//     console.log(rows);
//     // OR show first employee ID:
//     // console.log(rows[0].EmpID);
//     else
//     console.log(err);
//   })
// }); 

// Show in browser:
app.get('/showbooks',(req,res) => {
  mysqlConnection.query('SELECT * FROM books',(err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

// mysqlConnection.end();

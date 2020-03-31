const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
//express required as dependency in package.json but does not seem to be installed in the node_modules folder.
const app = express();
const port = 3306;

//body-parser required as dependency in package.json but does not seem to be installed in the node_modules folder.
app.use(bodyparser.json());

// Username:   jgy4kfpqhzeplmwl      Password:   nal168vbk5cgeq50
// Port:  3306     Database:   b0j93g47mct78nva
var mysqlConnection = mysql.createConnection({
      host : 'mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user : 'jgy4kfpqhzeplmwl',
  password : 'nal168vbk5cgeq50',
  database : 'b0j93g47mct78nva'
})

mysqlConnection.connect((err) => {
  if (!err)
  console.log('DB connection succeded');
  else
  console.log ('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


// Show in CLI:
app.get('/employees',(res,req) => {
  mysqlConnection.query('SELECT * FROM Employee',(err, rows, fields) => {
    if(!err)
    // Show entire table:
    console.log(rows);
    // OR show first employee ID:
    // console.log(rows[0].EmpID);
    else
    console.log(err);
  })
}); 

// Show in browser:
app.get('/employees',(req,res) => {
  mysqlConnection.query('SELECT * FROM Employee',(err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

mysqlConnection.end();

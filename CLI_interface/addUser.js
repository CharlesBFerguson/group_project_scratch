
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})



const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.listen(port, () => console.log(`Express server is running on port ${port}`));

app.use(bodyParser.json());

var dBase = mysql.createConnection({
    host : 'mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user : 'jgy4kfpqhzeplmwl',
password : 'nal168vbk5cgeq50',
database : 'b0j93g47mct78nva'
})

dBase.connect((err) => {
  if (!err)
  console.log('DB connection succeded. Please wait...');
  else
  console.log ('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// // Add user:

// setTimeout(() => {
// 	readline.question(`New user's First Name: `, (firstName) => {
//     fs.writeFileSync('firstName.txt', firstName);
//     readline.question(`New user's Last Name: `, (lastName) => {
//       fs.writeFileSync('lastName.txt', lastName);
//       readline.question(`New user's Phone Number: `, (phoneNumber) => {
//         fs.writeFileSync('phoneNumber.txt', phoneNumber);
//       console.log('files written');
//       // console.log(`Welcome, ${firstName} ${lastName}!`);
//       readline.close();
//       });
//     });
//   })},3000);
// // Execute userInfo.js to read and output the last files that were written


// Add user info to table:

const fs = require('fs');

let firstName = fs.readFileSync('firstName.txt', 'utf8');
let lastName = fs.readFileSync('lastName.txt', 'utf8');
let phoneNumber = fs.readFileSync('phoneNumber.txt', 'utf8');

app.get('/', (req, res) => {
  let post = {First_Name : firstName, Last_Name : lastName, Phone_Number : phoneNumber}; // Id_user set to Auto_Increment
  let sql = 'INSERT INTO user SET ?';
  let query = dBase.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('UserIn');
  });
});


// Show in CLI:
// 1. Must first comment out "Show in browser" code below.
// 2. Run node admin.js in terminal.
// 3. In browser enter  localhost:8080  and hit enter.
// 4. Return to terminal to see output in CLI.
// 5. Will have to press Ctrl+C to end (for now).
// Show in CLI:

// app.get('/',(res,req) => {
//   dBase.query('SELECT * FROM user',(err, rows, fields) => {
//     if(!err)
//     // Show entire table:
//     console.log(rows);
//     else
//     console.log(err);
//   })
// });


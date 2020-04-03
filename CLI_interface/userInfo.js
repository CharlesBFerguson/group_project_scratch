const fs = require('fs');

let fsFirstName = fs.readFileSync('firstName.txt', 'utf8');
let fsLastName = fs.readFileSync('lastName.txt', 'utf8');
let fsPhoneNumber = fs.readFileSync('phoneNumber.txt', 'utf8');
let userInfo = `${fsFirstName} ${fsLastName} ${fsPhoneNumber}`;
console.log(`User info: ${userInfo}`);
const express = require('express');
const mysql = require('mysql');

// host : 'mysql://jgy4kfpqhzeplmwl:nal168vbk5cgeq50@mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/b0j93g47mct78nva',
// user : 'jgy4kfpqhzeplmwl',
// password : 'nal168vbk5cgeq50',
// database : 'b0j93g47mct78nva'

// create connection
const db = mysql.createConnection({
      host : 'localhost',
      user : 'root',
  password : 'root',
  database : 'nodemysql'
});  

// connect
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();

// create db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    console.log(result);
    if(err) throw err;
    res.send('Database connected...');
  });
});

// create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title:'Post One', body:'This is post number one'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 1 added...');
  });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {title:'Post Two', body:'This is post number two'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 2 added...');
  });
});

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Posts fetched...');
  });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post fetched...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '228844',
  database : 'lidarhealth'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(error, results, fields){
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();

var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/post', function(req, res){
  console.log('request: '+req);
  console.log('response: '+ res);
  res.send('HTTP POST CALLED');
});

app.listen(3000, function(){
    console.log('running...')
});

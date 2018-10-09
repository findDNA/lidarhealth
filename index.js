var express = require('express');
var bodyParser=require("body-parser");
var mysql = require('mysql');
var ejs = require('ejs');
var pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '123456',
  database : 'lidarhealth'
});

/*connection.connect();
var  sql = 'SELECT * FROM contact';

connection.query(sql, function(error, results){
  if (error) throw error;
  console.log(results);
});

connection.end();*/
var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));  
/*app.use(express.static(__dirname+'./assets'));
app.use(express.static(__dirname+'./case'));*/
app.use(express.static(__dirname));
//插入
app.post('/contact', function(req, res){
	pool.getConnection(function(err,connection){
	// res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var sql ='INSERT INTO contact(name,email,phone,adr,message) VALUES(?,?,?,?,?)';
	  var params=[req.body.name,req.body.email,req.body.phone,req.body.adr,req.body.message];
   connection.query(sql,params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
        });
      res.redirect('./success.html');
     connection.release();
    
     });
});

//查询
app.get('/queryContact',function(req,res){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
   pool.getConnection(function(err,connection){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var sql ='SELECT * FROM contact';
    connection.query(sql,function (err, result) {
        if(err){
         console.log('[	QUERY	 ERROR] - ',err.message);
         return;
        }
       // result=JSON.stringify(result);
       // result = JSON.parse(result);
      // console.log(result);
       res.render('contactData',{data:result});
       
   
      });

     connection.release();
     });
	
});

//删除
app.get('/delete',function(req,res){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
   pool.getConnection(function(err,connection){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var sql ='DELETE FROM contact where id=?';
	  param=[req.query.id];
	 // console.log(param);
    connection.query(sql,param,function (err, result) {
        if(err){
         console.log('[	DELETE	 ERROR] - ',err.message);
         return;
        }else{
        	
        	res.redirect('/queryContact');
        	
        }
       // result=JSON.stringify(result);
       // result = JSON.parse(result);
      // console.log(result);
      // res.render('data',{data:result});
       
      
      });

     connection.release();

     });
	
});

app.listen(3000, function(){
    console.log('running...')
});
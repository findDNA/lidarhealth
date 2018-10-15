var express = require('express');
var bodyParser=require("body-parser");
var mysql = require('mysql');
var ejs = require('ejs');
const querystring = require("querystring");
var cookieParser=require('cookie-parser');
var session=require('express-session');
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
app.use(cookieParser());
app.use(session({
	secret:'12345',
	cookie:{maxAge:60000},
	resave:false,
	saveUninitialized:true
}));

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
	if(req.session.user!='admin'||req.session.user==null){
	 	
	 	res.redirect('./index.html');
	 }
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
//问卷调查的增删改查
//插入
app.post('/wjdc', function(req, res){
	
	pool.getConnection(function(err,connection){
	// res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var jsondata=req.body;
	  //var data=req.body;
   /* var field_1=data['entry[field_1]'];//姓名
	  var filed_2=data['entry[field_2]'];//性别
	  var filed_36=data['entry[field_36]'];//出生日期
	  var filed_37=data['entry[field_37]'];//身高
	  var filed_38=data['entry[field_38]'];//体重
	  var filed_39=data['entry[field_39]'];//出生地
	  var filed_40=data['entry[field_40]'];//职业
	  var filed_3=data['entry[field_3]'];//手机
	  var filed_5=data['entry[field_5]'];//邮箱
	  var filed_4=data['entry[field_4][province]']+data['entry[field_4][city]']+data['entry[field_4][district]']+data['entry[field_4][street]'];//地址
    var filed_43=data['entry[field_43]'];//怀孕
    var filed_44=data['entry[field_44]'];//是否有更年期
    var filed_45=data['entry[field_45]'];//月经
    var filed_8=data['entry[field_8]'];//小孩数
    //var filed_3=data['entry[field_3]'];
    var filed_9=data['entry[field_9]'];//更年期年龄
    var filed_10=data['entry[field_10]'];//运动
    var filed_11=data['entry[field_11]'];//吸烟
    var filed_12=data['entry[field_12]'];//喝酒
    var filed_13=data['entry[field_13]'];//保健品
	  var filed_14=data['entry[field_14]'];//几点入睡
	  var filed_15=data['entry[field_15]'];//空腹6小时
	  var filed_16=data['entry[field_16]'];//三餐规律
	  var filed_17=data['entry[field_17]'];//吃早餐
	  var filed_18=data['entry[field_18]'];//油炸食品
	  var filed_19=data['entry[field_19]'];//主食量
	  var filed_20=data['entry[field_20]'];//牛羊肉
	  var filed_21=data['entry[field_22]'];//鱼类
	  var filed_23=data['entry[field_23]'];//水果
	  var filed_24=data['entry[field_24]'];//蔬菜
	  var filed_25=data['entry[field_25]'];//鸡蛋
	  var filed_26=data['entry[field_26]'];//牛奶
	  var filed_27=data['entry[field_27]'];//可乐
	  var filed_28=data['entry[field_28]'];//水
	  var filed_29=data['entry[field_29][]'];//不适症状
	  var filed_29_others=data['entry[field_29_other]'];//其他
	  var filed_30=data['entry[field_30]'];//个人病史
	  var filed_30_other=data['entry[field_30-others]'];//个人病史其他
	  var filed_31=data['entry[field_31]'];
	  var filed_32=data['entry[field_32]'];//关系1
	  var filed_33=data['entry[field_33][]'];//关系疾病
	  var filed_33_other=data['entry[field_33_other]'];//其他
	  var filed_34=data['entry[field_34]'];//关系2
	  var filed_35=data['entry[field_35][]'];//关系疾病
	  var filed_35_other=data['entry[field_35_other]'];//其他
	  var filed_42=data['entry[field_42]'];//同意否
	  var stringdata="姓名："+field_1+"\n"+"地址："+filed_4;*/
	  var name=jsondata['entry[field_1]'];
	//var name='jack';
	 // console.log(name);
	  var stringdata = querystring.stringify(jsondata)//问卷中的数据转成字符串数据
	   var c_sql='SELECT cid from cname';
	   connection.query(c_sql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
        result = JSON.stringify(result);//把results对象转为字符串，去掉RowDataPacket
      //  console.log(result);//'[{"count":"1","type":"RangeError"},{"count":"3","type":"ReferenceError"}]'
        result= JSON.parse(result);//把results字符串转为json对象
        var max=result[0].cid
        for(var i=0;i<result.length;i++){
        	if(result[i].cid>max){
        		
        		max=result[i].cid;
        	}
        	
        }
        var cid=max+1;
      //  console.log(cid);
         var a_sql ='INSERT INTO cname(name,cid) VALUES(?,?)';
	       var params=[name,cid];
	       //往cname表插入数据
        connection.query(a_sql,params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
        
        });
        //往question中插入数据
        a_sql='INSERT INTO question(id,ans) Values(?,?)';
        params=[cid,stringdata];
          connection.query(a_sql,params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
        
        });
        
      });
    
	
        
     /*   var ans=JSON.stringify(req.body);
        a_sql ='INSERT INTO question(id,ans) VALUES(?,?)';
        params=[cid,ans];
          connection.query(a_sql,params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
        });*/
        
     res.redirect('./success.html');
     connection.release();
    
     });
   // var data=req.body;
   //console.log(stringdata);
    //console.log(data['entry[field_1]']);
});

//查询cname
app.get('/exam',function(req,res){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	 if(req.session.user!='admin'||req.session.user==null){
	 	
	 	res.redirect('./index.html');
	 }
   pool.getConnection(function(err,connection){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var sql ='SELECT * FROM cname';
    connection.query(sql,function (err, result) {
        if(err){
         console.log('[	QUERY	 ERROR] - ',err.message);
         return;
        }
       // result=JSON.stringify(result);
       // result = JSON.parse(result);
    //  console.log(result);
       res.render('exam',{data:result});
       
   
      });

     connection.release();
     });
	
});


//查询question
app.get('/ans',function(req,res){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	 if(req.session.user!='admin'||req.session.user==null){
	 	
	 	res.redirect('./index.html');
	 }
   pool.getConnection(function(err,connection){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var sql ='SELECT * FROM question WHERE id=?';
	  var param=[req.query.id];
    connection.query(sql,param,function (err, result) {
        if(err){
         console.log('[	QUERY	 ERROR] - ',err.message);
         return;
        }
      // result=JSON.stringify(result[0].ans);
      
      
       var ans=querystring.parse(result[0].ans);
       var id_ans={'id':req.query.id,'ans':ans}
     // console.log(id_ans);
      //console.log(test.data['entry[field_29][]']);
       res.render('ans',{data:id_ans});
       
   
      });

     connection.release();
     });
	
});
//根据id删除Ans
app.get('/deleteAns',function(req,res){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
   pool.getConnection(function(err,connection){
	 //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
	  //connection.connect();
	  var q_sql ='DELETE FROM question WHERE id=?';
	  var c_sql ='DELETE FROM cname WHERE cid=?';
	  var param=[req.query.id];
    connection.query(q_sql,param,function (err, result) {
        if(err){
         console.log('[	QUERY	 ERROR] - ',err.message);
         return;
        }
   

     
     });
      connection.query(c_sql,param,function (err, result) {
        if(err){
         console.log('[	QUERY	 ERROR] - ',err.message);
         return;
        }
       // result=JSON.stringify(result);
       // result = JSON.parse(result);
      // console.log(result);
       res.redirect('/exam');
       
   
      });
      connection.release();
	
});

});
//admin
app.get('/admin',function(req,res){
//res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
console.log(req.query);
var name=req.query.name;
var pwd=req.query.pwd;
var s_name="admin";
var s_pwd="lidar1566";
if(name==s_name){
	
	if(pwd==s_pwd){
		req.session.user=name;
		res.render('admin',{});
	}else{
		
		res.redirect('./index.html');
	}
	
}else{
	
	res.redirect('./index.html');
	
}
 
});
//解决路由宕机问题
//1、使用了forever守护进程
//2、检测为捕捉到的异常

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(3000, function(){
    console.log('running...')
});
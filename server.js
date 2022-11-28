const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const e = require('express');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '0828',
    database : 'stella'
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

conn.connect(function(err){
    if(!err) {
      console.log("Database is connected ... \n\n");
      conn.query('SELECT * FROM player',(error, rows, fields) => {
        console.log("User Info : ", rows);
      })
    } else {
      console.log("Error connecting database ... \n\n");
    }
  });

//-------------------------------------------------------회원가입
  app.post("/make_user",function(req,res){
    var userno;
    var user_id = req.body.ID;
    var user_pw = req.body.PW;
    var user_name = req.body.NAME;
    console.log('user_id: ', user_id);
    console.log('user_pw: ', user_pw);
    console.log('user_name: ', user_name);
    
    conn.query('INSERT INTO player (userno, userID, userPW, userName) values(?, ?, ?, ?)', [userno, user_id, user_pw, user_name], function(err, rows, fields)
    {
      if (err)
      {
        res.status(500).send('Internal Server Error');
        console.log(err);
        console.log('Error while performing Query.');
      }
      else
      {
        var result_json = {};
        result_json["url"] = req.originalUrl;
        result_json["userId"] = rows.insertId;
        res.json(result_json);
      }
    });
  });
//-------------------------------------------------------로그인
  app.post("/login_user",function(req,res){
    var user_id = req.body.ID;
    var user_pw = req.body.PW;
    if(user_id&&user_pw){
      conn.query('SELECT userID, userPW FROM player WHERE BINARY(userID) = ?', [user_id], function(err, rows, fields) {
          if(rows.length > 0)
          {
            if(user_pw ==  rows[0].userPW){
              console.log("성공");
              console.log(rows[0]);
              res.send(rows[0]);
            }
            else{
              console.log("비밀번호 오류");
              res.send("102");
            }
          }
          else{
            console.log("아이디 오류");
            res.send("101");
          }
          if(err){
            res.send("error");
          }
        });
    }
  });
  //-------------------------------------------------------골드
  app.post("/gold_send",function(req,res){
    var gold = req.body.GoldSend;
    var userno = req.body.userno;
    console.log(gold);
    console.log(userno);
    conn.query('UPDATE player SET gold = ? WHERE userno = ?', [gold, userno], function(err, rows, fields) {
      if(err){
        res.send("error");
      }
      if(rows.length > 0){
        console.log(rows);
        console.log("보냄");
        res.send(rows[0]);
      }
    })
    console.log(gold);

  });
  app.post("/dia_send",function(req,res){
    var dia = req.body.DiaSend;
    var userno = req.body.userno;
    console.log(gold);
    console.log(userno);
    conn.query('UPDATE player SET userDIa = ? WHERE userno = ?', [dia, userno], function(err, rows, fields) {
      if(err){
        res.send("error");
      }
      if(rows.length > 0){
        console.log(rows);
        console.log("보냄");
        res.send(rows[0]);
      }
    })
    console.log(gold);

  });
//---------------------------------------------------------
  app.get("/stamina_user", function(req, res){
    print(req, res);
  });

  app.listen(3030, function(){
    console.log('Connected 3030 port!');
  });
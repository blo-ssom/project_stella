const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const e = require('express');

var conn = mysql.createConnection({
  //34.63.113.6
    host : '34.64.150.107',
    port : '3306',
    user : 'root',
    password : '0828',
    database : 'stella',
    connectTimeout: 30000
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
      conn.query('SELECT * FROM carddata',(error, rows, fields) => {
        console.log("card Info : ", rows);
      })
      conn.query('SELECT * FROM stagedata',(error, rows, fields) => {
        console.log("stage Info : ", rows);
      })
    } else {
      console.log("Error connecting database ... \n\n");
      console.log(err.message);
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
// stageClear
app.post("/stageClear",function(req,res) 
                { //;

                  var sql = "INSERT INTO `stella`.`stagedata` (`userno`, `m_bClear`, `m_strStage`) VALUES (?, ?, ?) ";
                  req.body.userno

                  var b = req.body;
                  
                    conn.query(sql,[b.userno, b.d1, b.d2], function(err, rows, fields)  
                    {  
                      if (err)
      {
        console.log(err.message);
      }
      else
      {
        console.log(" 성공");
      }

                    } )
                });



app.post("/insertCard",function(req,res) 
                { 
                  var sql = "INSERT INTO `stella`.`carddata` (`userno`, `m_eCardType`, `m_eCardRank`, `m_nCost`, `m_nLevel`, `m_nMaxLevel`, `m_nUnlimite`, `m_nLevelUpGold`, `m_fAp`, `m_fHp`, `_eMT`, `cardno`) ";
                  sql += "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, cardno)";
                  //UPDATE player SET m_nGold = ? WHERE userno = ?
                  //INSERT INTO `stella`.`carddata` (`userno`, `m_eCardType`, `m_eCardRank`, `m_nCost`, `m_nLevel`, `m_nMaxLevel`, `m_nUnlimite`, `m_nLevelUpGold`, `m_fAp`, `m_fHp`, `_eMT`, `cardno`) 
                  //VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                  req.body.userno

                  var b = req.body;
                  
                    conn.query(sql,[b.userno, b.d1, b.d2, b.d3, b.d4, b.d5, b.d6, b.d7, b.d8, b.d9, b.d10], function(err, rows, fields)  
                    {  
                      if (err)
      {
        console.log(err.message);
      }
      else
      {
        console.log(" 성공");
      }

                    } )
                });

app.post("/login_user",function(req,res){
    var user_id = req.body.ID;
    var user_pw = req.body.PW;
    if(user_id&&user_pw){
      conn.query('SELECT userno, userID, userPW, userName, m_nGold, m_nDiamond, m_nGas, _bFirst FROM player WHERE BINARY(userID) = ?', [user_id], function(err, rows, fields) {
          if(rows.length > 0)
          {
            if(user_pw ==  rows[0].userPW){
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
  //-------------------------------------------------------로그인
  app.post("/test",function(req,res) 
                { 
                    conn.query('select * from player;', function(err, rows, fields)  
                    {  
                      var person = {}; //또는 var person = new Object();
                      person.info = rows;
                      res.json(person); 
                    }  )
                });

  app.post("/GetCardData", function(req, res){
      conn.query('SELECT * FROM carddata where userno = '+ req.body.userno, function(err, rows, fields){
        var dara = {}; //또는 var person = new Object();
        dara.info = rows;

        console.log("GetCardData 호출 " + req.body.userno);

        res.json(dara); 
      })  
  });
  app.post("/GetStageData", function(req, res){
      conn.query('SELECT * FROM stagedata where userno = '+req.body.userno, function(err, rows, fields){
        var dara = {}; //또는 var person = new Object();
        dara.info = rows;
        console.log("GetStageData 호출 : " + req.body.userno);
        console.log("GetStageData : " + rows);
        res.json(dara); 
      })  
  });
  //-------------------------------------------------------재화
  app.post("/gold_send",function(req,res){
    var gold = req.body.GoldSend;
    var userno = req.body.userno;
    console.log(gold);
    console.log(userno);
    conn.query('UPDATE player SET m_nGold = ? WHERE userno = ?', [gold, userno], function(err, rows, fields) {
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

  app.listen(3030, function() 
  {
    console.log('Connected 3030 port!');
  });
  
  
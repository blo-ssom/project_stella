const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');

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
        // result_json["url"] = req.originalUrl;
        // result_json["userId"] = rows.insertId;
        res.json(result_json);
      }
    });
  });

  app.post("/show_user",function(req,res){
    var user_id = req.body.userid;
    var sql = 'SELECT * from player WHERE userId = ?';
    var param = user_id;
    conn.query(sql, user_id, function(err, rows, fields) {
      if (err)
      {
        res.send("error");
        console.log("error is:"+err);
        console.log('Error while performing Query.');
      }
      else
      {
        res.send(rows[0]);
      }
    });
  });
  app.listen(3030, function(){
    console.log('Connected 3030 port!');
  });
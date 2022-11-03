const express = require('express')

const db_config = require(__dirname + '/db.js');
const conn = db_config.init();

var app = express()
app.use(express.json())

app.get('/', (req, res) => {
    conn.query('SELECT * FROM player', function (error, results) {
      if (error) throw error;
      console.log(results[0].UserPW);
      
      // console.log(fields);
      res.json(results);
      res.end();
      });
  })

  //포트설정
  app.listen(3030, () => {
    console.log('> server start! ')
  })
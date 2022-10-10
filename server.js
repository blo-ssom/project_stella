const express = require("express");
const app = express();
const port = 8080;
const mysql = require('mysql');


    var conn = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'gameserver'
    });

    conn.connect((err) =>
    {
        if(err){
            console.log(err);
            conn.end();
            throw err;
        }
        else{
            console.log("DB Connect Success");
            // collback(conn);
        }
   }); 



conn.query('SELECT * FROM player', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is : ', rows);
});
app.get('/register_user', (req, res) => {
    var user_id = req.body.id;
    var user_pw = req.body.pw;
    res.send('hello');

    connection.query('INSERT INTO player (UserID, UserPW) value(?,?)', [user_id, user_pw], (err, rows, fileds));
});
app.listen(port, ()=>{
    console.log("Server Start");
})

conn.end();
// ---------------------------------------------- MYSQL 연결 코드

// app.use(express.json());

// app.route("/api/signin").post((req, res) =>{
//     const data = req.body;
//     console.log(data.uid);

//     connectDB((conn) => {
//         var sql = `select * from player where UserID = '${data.uid}'`;
//         conn.query(sql, (err, results, fields) => {
//             if(err){
//                 res.json({
//                     cmd : 1101,
//                     errorno : err.errno
//                 });
//             }
//             else{
//                 console.log(results);
//                 if(results[0] === undefined){
//                     res.json({
//                         cmd : 1101,
//                         errorno : 9001
//                     });
//                 }
//                 else{
//                     res.json({
//                         cmd : 200
//                     });
//                 }
//             }
//         });
//     });
// }) ;

// app.route("/api/join").post((req, res) =>
// {
//     const user = req.body;
//     console.log(user.uid, user.nickname);

//     connectDB((conn) =>{
//         var sql = `insert into users(uid, nickname) values ('${user.uid}', '${user.nickname}')`;
//         console.log(sql);
//         con.query(sql, (err, result, fields) =>
//         {
//           if(err)
//           {
//             console.log(err.errno);
//             res.json(
//               {
//                 cmd : 1001,
//                 errorno : err.errno
//               }
//             );
//           }
//           else
//           {
//             console.log(result);
//             res.json(
//             {
//               cmd : 200
//             });
//           }
//           con.end();
//         });
//       });
     
     
//     });
     

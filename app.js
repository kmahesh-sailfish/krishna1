var express = require('express');
var mysql =require('mysql');
var path     = require('path');
 var   bodyParser = require('body-parser');
var app = express();

var pool=mysql.createPool({
    host:'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'eiskd7d5t00o1shv',
    password:'fkvdijztrdb8gdcg',
    database:'ccegfa99xf80kp53',
    ConnectionLimit:20
});
//var connection = mysql.createConnection({
// connectionLimit :20,
// host:'localhost',
// user:'root',
/// password:'Rubhu@111213',
// database:'test'
 //});
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});
app.get('/',function(req,res){
  res.send('welcome to Api exprees1..');

});

app.get('/sample',function(req,res){
  res.type('application/json');
  res.send(
      {
        "Name":"Mahesh",
        "Job":"Software Engineer",
        "UG":"B.Tech (IT)",
        "RollNo":"007"
      });
});
app.get('/display',function(req,res,next){
    pool.getConnection(function(err,connection){
        var query='select * from files';
        connection.query(query,function(err,rows){
            connection.release();
            if(err){
                console.log(err);
                res.status(500).send('500 Error : ' + err);
            }
            else
            {
                res.status(200).json(rows);
            }
        });
    });

});

app.post('/inserid',function(req,res,next){
    try{

        pool.getConnections(function(err,connection){
            var query = "INSERT INTO files (file_data) VALUES  " +
                "('" + req.body['file_data']+"')";
                    connection.query(query,function(err,rows){
                if (err) {
                    console.log(err);
                    res.status(500).send('500 Error : ' + err);
                }
                else {

                    res.status(200).json(rows);

                }
            })
        })

    }
    catch(err)
    {
        console.log("error on the body"+err);
    }

})



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('Message : '+err.message,'Error : '+err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('Message : '+err.message,
      'Error : '+err);
});


module.exports = app;

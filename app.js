var express = require('express');
var mysql =require('mysql');
var path     = require('path');
 var   bodyParser = require('body-parser');
var app = express();


var connection = mysql.createConnection({
 connectionLimit :20,
 host:'localhost',
 user:'root',
 password:'Rubhu@111213',
 database:'test'
 });
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
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
    var query=connection.query('select * from files',function(err,rows){
        res.send(rows);
    })
})

app.post('/inserid',function(req,res,next){
    try{
        var query = "INSERT INTO files (file_data) VALUES  " +
            "('" + req.body['file_data']+"')";
        connection.query(query, function (err, rows) {

            if (err) {
                console.log(err);
                res.status(500).send('500 Error : ' + err);
            }
            else {

                res.status(200).json(rows);
            }
        });
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

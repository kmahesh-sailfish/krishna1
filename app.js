var express = require('express');

var app = express();

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

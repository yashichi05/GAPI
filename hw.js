var express = require('express');
var app = express();
 
app.use(express.static('public'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "API_cus.html" );
})
app.get('/receipt', function (req, res) {
   res.sendFile( __dirname + "/" + "receipt.html" );
})
app.get('/ship', function (req, res) {
   res.sendFile( __dirname + "/" + "shipC.html" );
})
app.get('/printOrder', function (req, res) {
   res.sendFile( __dirname + "/" + "printOrder.html" );
})




app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
 

app.use(express.static('files'));


var server = app.listen(8000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("開始執行http://locakhost:%s", port)
 
})
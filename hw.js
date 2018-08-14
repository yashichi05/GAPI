var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})
app.get('/input', function (req, res) {
    res.sendFile(__dirname + "/" + "API_cus.html");
})
app.get('/receipt', function (req, res) {
    res.sendFile(__dirname + "/" + "receipt.html");
})
app.get('/ship', function (req, res) {
    res.sendFile(__dirname + "/" + "shipC.html");
})
app.get('/printOrder', function (req, res) {
    res.sendFile(__dirname + "/" + "printOrder.html");
})
app.get('/products', function (req, res) {
    res.sendFile(__dirname + "/" + "products.html");
})
app.get('/2', function (req, res) {
    res.sendFile(__dirname + "/" + "index_TEST.html");
})
app.get('/cancel', function (req, res) {
    res.sendFile(__dirname + "/" + "cancelOrder.html");
})



app.get('/gettxt', function (req, res) {

    res.sendFile(__dirname + "/files/" + "txt.txt");
})


app.use(express.static('files'));


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("開始執行http://locakhost:%s", port)

})

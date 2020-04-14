'use strict';
var express = require('express');
var PORT = 3000;
var app = express();
app.get('/', function (req, res) {
    res.send('Helloworld\n');
});
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
//console.log('Running on http://192.168.99.100:' + PORT);
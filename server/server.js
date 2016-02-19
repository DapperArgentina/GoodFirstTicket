var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// start listening to requests on port 3000
app.listen(3000);


// export our app for testing and flexibility, required by index.js
module.exports = app;

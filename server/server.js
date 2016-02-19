var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


var port = process.env.PORT || 3000;
// start listening to requests on port 3000
app.listen(port);


// export our app for testing and flexibility, required by index.js
module.exports = app;

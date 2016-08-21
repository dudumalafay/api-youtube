'use strict';

const express          = require('express');
const expressLoad      = require('express-load');
const path             = require('path');
const session          = require('express-session');
const bodyParser       = require('body-parser');
const http             = require('http');
const app              = express();
const expressValidator = require('express-validator'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 

app.use(session({secret: 'sometext', resave: true, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 	

expressLoad('config').
then('models').
then('controllers').
then('routes').
into(app);

const port = process.env.PORT || 80; 
app.set('port', port); 

//lol
var server = http.createServer(app); 

app.controllers.socketController.start(server); 

server.listen(port); 

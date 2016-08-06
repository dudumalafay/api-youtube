'use strict';

const express      = require('express');
const expressLoad  = require('express-load');
const pathe        = require('path');
const session      = require('express-session');
const bodyParser   = require('body-parser');
const http         = require('http');
const app          = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'sometext', resave: true, saveUninitialized: true}));

app.use(express.static(pathe.join(__dirname, '/public')));

app.set('views', pathe.join(__dirname, '/views'));
app.set('view engine', 'jade');


expressLoad('config').then('models').then('controllers').then('routes').into(app);

const port = process.env.PORT || 3000; 
app.set('port', port); 
http.createServer(app).listen(port); 
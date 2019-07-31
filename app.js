// built ins
const path = require('path');

// node packages
const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//constants
const api_info = require('./util/constants');

const app = express();

// configure server
app.set('view engine', 'ejs');
app.set('views', 'views');

// configer requests
// req parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', (req, res, next) => {
    res.render('index');
});

app.post('/new-data', (req, res, next) => {
    
    res.redirect('index');
});

app.listen(3000);
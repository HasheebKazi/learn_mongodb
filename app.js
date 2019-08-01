// built ins
const path = require('path');

// node packages
const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//constants
const api_info = require('./util/constants');

// utility
const db_funcs = require('./util/db');

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

app.post('/new-data', (req, res, next) => {

    const name = req.body.name;
    const fav = req.body.fav;

    const client = new MongoClient(api_info.mongdbURL);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('successfully connected to server');

            // create a database
            const db = client.db(api_info.dbName);

            // access a collection
            const collection = db.collection('cats');

            // run crud operation on db
            collection.insertOne({
                name: name,
                fav: fav
            }, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted a new record');
                }
            });
        }
        client.close();
    })
    
    res.redirect('/');
});

app.get('/cats', (req, res, next) => {
    const client = new MongoClient(api_info.mongdbURL);
    client.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('successfully connected to server');

            // create a database
            const db = client.db(api_info.dbName);

            // access a collection
            // const collection = db.collection('cats');

            // // run crud operation on db
            // collection.find({}).toArray(function(err, docs) {
            //     assert.equal(err, null);
            //     console.log("Found the following records");
            //     console.log(docs)
            //     res.render('all_cats', {
            //         cats: docs
            //     });
            // });

            db_funcs.findAll(db, 'cats', result => {
                res.render('all_cats', {
                    cats: result
                });
            })
        }
        client.close();
    })
});

app.use('/', (req, res, next) => {
    res.render('index');
});

app.listen(3000);
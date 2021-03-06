const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/profiles')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        // process.exit(1);
    });

var profileRouter = require('./src/routes/profileRouter.js');

app.use(bodyParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

app.use('/', express.static('public'));

app.use('/profiles', profileRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(process.env.PORT || 3000);

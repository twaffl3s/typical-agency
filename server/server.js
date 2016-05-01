// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Word = require('../api/models/word');
var Color = require('../api/models/color');
var Images = require('../api/models/image');
var Bio = require('../api/models/bio');
var Client = require('../api/models/client');

mongoose.connect('mongodb://twaffles:sakura@ec2-52-73-225-190.compute-1.amazonaws.com:27017/dummyDB'); // connect to our database
//

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.use(express.static(path.join(__dirname + '/../')));
router.route('/').get(function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
    console.log('this works');

});
router.route('/api').get(function(req, res) {
    res.sendFile(path.join(__dirname + '/../api/index.html'));
});

// more routes for our API will happen here
// on routes that end in /words
// ----------------------------------------------------
router.route('/api/words')
    // retrieve words
    .get(function(req, res) {
      console.log('this works');
        Word.find(function(err, words) {
            if (err)
                res.send(err);

            res.json(words);
        });
    });
router.route('/api/colors')
  .get(function(req,res){
    Color.find(function(err, colors) {
      if (err)
        res.send(err);

      res.json(colors);
    });
  });
  router.route('/api/images')
    .get(function(req,res){
      Images.find(function(err, images) {
        if (err)
          res.send(err);

        res.json(images);
      });
    });
    router.route('/api/bios')
      .get(function(req,res){
        Bio.find(function(err, bios) {
          if (err)
            res.send(err);

          res.json(bios);
        });
      });
      router.route('/api/clients')
        .get(function(req,res){
          Client.find(function(err,clients) {
            if (err)
              res.send(err);

            res.json(clients);
          });
        });
// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

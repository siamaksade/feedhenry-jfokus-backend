var $fh = require('fh-mbaas-api');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function questionRoute() {
  var question = new express.Router();
  question.use(cors());
  question.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  question.get('/', function(req, res) {
    var options = {
      "act": "list",
      "type": "question", // Entity/Collection name
    };

    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
      } else {
        pickedItem = data.list[Math.floor(Math.random() * data.count)]; // pick a random question
        pickedQuestion = pickedItem.fields;
        pickedQuestion.id = pickedItem.guid;
        res.json(pickedQuestion);
      }
    });
  });
  
  return question;
}

module.exports = questionRoute;





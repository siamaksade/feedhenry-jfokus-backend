var $fh = require('fh-mbaas-api');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function leadRoute() {
  var lead = new express.Router();
  lead.use(cors());
  lead.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  lead.post('/', function(req, res) {
    lottery = false;
    
    // check question
    var options = {
      "act": "read",
      "type": "question",
      "guid": req.body.answer.split(":")[0]
    };

    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
      } else {
        console.log("Question: " + JSON.stringify(data));
        console.log("Correct Answr: " + data.fields.correct);
        console.log("User Asnwer: " + req.body.answer.split(":")[1]);
        console.log(data.fields.correct.valueOf() == req.body.answer.split(":")[1].valueOf());
        
        lottery = (data.fields.correct.valueOf() == req.body.answer.split(":")[1].valueOf());
        console.log("Lottery 1: " + lottery);
      }
    });
    
    console.log("Lottery 2: " + lottery);

    options = {
      "act": "create",
      "type": "lead", // Entity/Collection name
      "fields": { // The structure of the entry/row data. A data is analogous to "Row" in MySql or "Documents" in MongoDB
        "name": req.body.name,
        "email": req.body.email,
        "company": req.body.company,
        "job": req.body.job,
        "lottery": lottery
      }
    };

    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
        res.json({msg: err, status: 'error'});
      } else {
        res.json({msg: "Registered", status: 'success'});
      }
    });
  });

  return lead;
}

module.exports = leadRoute;





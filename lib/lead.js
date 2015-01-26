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

    // DEBUG-START 
    /** 
    console.log("##################");

    var options = {
      "act": "list",
      "type": "question", // Entity/Collection name
    };


    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error 1 " + err);
      } else {
        for (i = 0; i < data.list.length; i++) { 
          console.log("Question id: " + data.list[i].guid);

            $fh.db({
                "act": "read",
                "type": "question",
                "guid": data.list[i].guid
              }, function (err, data) {
              if (err) {
                console.error("Error 2 " + err);
              } else {
                console.log(JSON.stringify(data));
              }
            });
        }
      }
    });
    console.log("##################");
    **/
    // DEBUG-END 

    // check question
    var lottery = '0';
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
        console.log("User Asnwer: " + req.body.answer.split(":")[1]);
        console.log(req.body.answer.split(":")[1] == data.correct, typeof(data.fields.correct), typeof(req.body.answer.split(":")[1]));
        
        
        if (data.fields.correct == req.body.answer.split(":")[1]) {
          lottery = 1;
        }
      }
    });

    var options = {
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





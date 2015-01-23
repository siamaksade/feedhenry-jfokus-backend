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
    console.log(new Date(), 'In Lead route POST / req.body=', req.body);
    var options = {
      "act": "create",
      "type": "lead", // Entity/Collection name
      "fields": { // The structure of the entry/row data. A data is analogous to "Row" in MySql or "Documents" in MongoDB
        "name": req.body.name,
        "email": req.body.email,
        "company": req.body.company,
        "job": req.body.job
      }
    };

    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
        res.json({msg: err, status: 'error'});
      } else {
        res.json({msg: err, status: 'success'});
        console.log(JSON.stringify(data));
      }
    });
  });

  return lead;
}

module.exports = leadRoute;





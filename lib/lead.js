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
    res.json({msg: 'Hello World'});
  });

  return lead;
}

module.exports = leadRoute;





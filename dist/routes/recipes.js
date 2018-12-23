"use strict";

var express = require("express");

var router = express.Router();

var _require = require('../models'),
    Recipe = _require.Recipe;
/* GET users listing. */


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/search", function (req, res, next) {
  var query = req.body.query;
  Recipe.find({
    label: new RegExp(query, 'i')
  }).limit(30).exec(function (err, results) {
    res.send(results);
  });
});
module.exports = router;
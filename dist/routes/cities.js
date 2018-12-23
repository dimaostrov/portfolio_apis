"use strict";

var express = require("express");

var cityController = require("../controllers/cities");

var regionController = require('../controllers/regions');

var router = express.Router();

var _require = require('../utils'),
    authenticator = _require.authenticator,
    tokenize = _require.tokenize; // route to get all cities


router.get('/allcities', authenticator(), function (req, res) {
  console.log('hello!!!');
  tokenize(cityController.getAll(req, res), req, res);
}); // route to get an info of a city by @name

router.post('/cityname/', authenticator(), function (req, res) {
  tokenize(cityController.getByCity(req, res), req, res);
}); // route to get region info by @regions id array

router.post('/regionIDs/', authenticator(), function (req, res) {
  tokenize(regionController.getProperties = requireRegions(req, res), req, res);
}); // takes a 'east', 'west', 'midwest', 'mideast', 'puertorico' 
// @region sting to give back multiple cities

router.post('/region', authenticator(), function (req, res) {
  tokenize(cityController.byRegion(req, res), req, res);
}); // route to receive multiple properties by the name of the city
// @name string of city

router.post('/listings', authenticator(), function (req, res) {
  tokenize(cityController.getCityRegions(req, res), req, res);
});
router.post('/topzipbycity', authenticator(), function (req, res) {
  tokenize(cityController.topZipByCity(req, res), req, res);
});
router.post('/botquery', authenticator(), function (req, res) {
  cityController.botQuery(req, res);
});
module.exports = router;
const express = require("express");
const cityController = require("../controllers/cities");
const regionController = require('../controllers/regions');
const router = express.Router()
const { authenticator, tokenize } = require('../utils');

// route to get all cities
router.get('/allcities', authenticator(), (req, res) => {
    console.log('hello!!!');
    tokenize(cityController.getAll(req, res), req, res);
});

// route to get an info of a city by @name
router.post('/cityname/', authenticator(), (req, res) => {
    tokenize(cityController.getByCity(req, res), req, res);
});

// route to get region info by @regions id array
router.post('/regionIDs/', authenticator(), (req, res) => {
    tokenize(regionController.getProperties= requireRegions(req, res), req, res);
})

// takes a 'east', 'west', 'midwest', 'mideast', 'puertorico' 
// @region sting to give back multiple cities
router.post('/region', authenticator(), (req, res) => {
    tokenize(cityController.byRegion(req, res), req, res);
})

// route to receive multiple properties by the name of the city
// @name string of city
router.post('/listings', authenticator(), (req, res) => {
    tokenize(cityController.getCityRegions(req, res),req, res)
})

router.post('/topzipbycity', authenticator(), (req, res) => {
    tokenize(cityController.topZipByCity(req, res), req, res)
})

module.exports = router;
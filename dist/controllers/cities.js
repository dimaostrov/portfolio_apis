"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var city = require('../models/cities');

var regions = require('../models/regions');

var R = require('ramda');

var controller = {};

controller.getAll =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var cities;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return city.getAll();

          case 3:
            cities = _context.sent;
            logger.info('sending all cities...');
            res.send(cities);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            logger.error('Error in getting cities- ' + _context.t0);
            res.send('Got error in getAll');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

controller.getByCity =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(req, res) {
    var cityName, cityInfo;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cityName = req.body.name;
            _context2.prev = 1;
            _context2.next = 4;
            return city.getByCity(cityName);

          case 4:
            cityInfo = _context2.sent;
            res.send(cityInfo);
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            logger.error('Error in getting cities- ' + _context2.t0);
            res.send('Got error in getByCity');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

controller.byRegion =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(req, res) {
    var regionName, cities;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            regionName = req.body.region;
            _context3.prev = 1;
            _context3.next = 4;
            return city.getByRegion(regionName);

          case 4:
            cities = _context3.sent;
            res.send(cities);
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            logger.error('Error in getting rerion- ' + _context3.t0);
            res.send('Got error in byRegion');

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

controller.getCityRegions =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(req, res) {
    var cityName, cityInfo, regionsOfCity, listings;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cityName = req.body.name;
            _context4.prev = 1;
            _context4.next = 4;
            return city.getByCity(cityName);

          case 4:
            cityInfo = _context4.sent;
            regionsOfCity = cityInfo[0].regions;
            _context4.next = 8;
            return regions.returnListings(regionsOfCity);

          case 8:
            listings = _context4.sent;
            res.send(listings);
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            logger.error('Error in getting city region data- ' + _context4.t0);
            res.send('Got error in getCityRegions');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

controller.topZipByCity =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(req, res) {
    var cityName, cityInfo, regionsOfCity, listings, zipsWithRevenue, sort, revenuePlace, sortFunction;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cityName = req.body.name;
            _context5.prev = 1;
            _context5.next = 4;
            return city.getByCity(cityName);

          case 4:
            cityInfo = _context5.sent;
            regionsOfCity = cityInfo[0].regions;
            _context5.next = 8;
            return regions.returnListings(regionsOfCity);

          case 8:
            listings = _context5.sent;
            // map through each property and get annual revenue, then get the average
            // and then return sorted array with zips
            zipsWithRevenue = listings.map(function (region) {
              var zip = region.zip,
                  top_listings = region.top_listings;
              var earningPotentialArray = top_listings.map(function (x) {
                var property = x[0].listing;
                var revenue = property.annual_rental_earning_potential;
                return revenue;
              });
              var averageRevenue = R.mean(earningPotentialArray);
              return [zip, averageRevenue];
            }); // Here all sorting happens = require( the unsorted zipsWithRevenue

            sort = function sort(a, b) {
              return b - a;
            };

            revenuePlace = R.prop(1);
            sortFunction = R.sortWith([R.descend(R.compose(revenuePlace))]);
            res.send(sortFunction(zipsWithRevenue));
            _context5.next = 20;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](1);
            logger.error('Error in getting city region data- ' + _context5.t0);
            res.send('Got error in getCityRegions');

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[1, 16]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

controller.getAllCityNames =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(req, res) {
    var namesData;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return city.find({}, {
              name: 1,
              _id: 0
            });

          case 2:
            namesData = _context6.sent;
            // const names = namesData.map(x => x.name);
            res.send(namesData);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

controller.botQuery =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(req, res) {
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            res.send('thanks for bots');

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports = controller;
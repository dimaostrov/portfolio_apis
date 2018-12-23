"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require('mongoose');

var citieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  occupancy_ltm: {
    type: Number,
    required: true
  },
  city_id: {
    type: Number,
    required: true,
    unique: true
  },
  num_total_listings: {
    type: Number,
    required: true
  },
  num_active_listings: {
    type: Number,
    required: true
  },
  boundary: {
    type: Object
  },
  annual_revenue_potential: {
    type: Object
  },
  regions: [{
    type: Number,
    unique: true
  }],
  top_properties: [{
    type: Object,
    unique: true
  }]
}, {
  collection: 'city'
});
var citiesModel = mongoose.model('city', citieSchema);

citiesModel.getAll = function () {
  return citiesModel.find({});
};

citiesModel.getByCity = function (cityName) {
  return citiesModel.find({
    name: cityName
  });
};

citiesModel.getByRegion =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(region) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = region;
            _context.next = _context.t0 === 'west' ? 3 : _context.t0 === 'east' ? 5 : _context.t0 === 'midwest' ? 7 : _context.t0 === 'mideast' ? 9 : _context.t0 === 'puertorico' ? 11 : 13;
            break;

          case 3:
            return _context.abrupt("return", citiesModel.find({
              'boundary.coordinates.0': {
                $lt: -114
              }
            }));

          case 5:
            return _context.abrupt("return", citiesModel.find({
              $and: [{
                'boundary.coordinates.0': {
                  $gt: -84
                }
              }, {
                'boundary.coordinates.1': {
                  $gt: 24
                }
              }]
            }));

          case 7:
            return _context.abrupt("return", citiesModel.find({
              $and: [{
                'boundary.coordinates.0': {
                  $gt: -114
                }
              }, {
                'boundary.coordinates.0': {
                  $lt: -94
                }
              }]
            }));

          case 9:
            return _context.abrupt("return", citiesModel.find({
              $and: [{
                'boundary.coordinates.0': {
                  $lt: -84
                }
              }, {
                'boundary.coordinates.0': {
                  $gt: -94
                }
              }, {
                'boundary.coordinates.1': {
                  $gt: 19
                }
              }]
            }));

          case 11:
            return _context.abrupt("return", citiesModel.find({
              'boundary.coordinates.1': {
                $lt: 19
              }
            }));

          case 13:
            return _context.abrupt("break", 14);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = citiesModel;
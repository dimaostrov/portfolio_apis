"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var regions = require('../models/regions');

var controller = {};

controller.getPropertiesFromRegions =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var regionIDs, listings;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            regionIDs = req.body.regions;
            _context.prev = 1;
            _context.next = 4;
            return regions.returnListings(regionIDs);

          case 4:
            listings = _context.sent;
            res.send(listings);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            logger.error('Failed to get listings- ' + _context.t0);
            res.send('Failed to get listings by those IDs!');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = controller;
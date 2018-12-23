"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require('mongoose');

var regionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  zip: {
    type: String
  },
  top_listings: [{
    type: Array
  }]
}, {
  collection: 'region'
});
var regionsModel = mongoose.model('region', regionSchema);

regionsModel.returnListings =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(arrayOfIDs) {
    var listings;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            listings = regionsModel.find({
              id: {
                $in: arrayOfIDs
              }
            }, function (err, docs) {
              if (err) throw err;
              return docs;
            });
            return _context.abrupt("return", listings);

          case 2:
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

module.exports = regionsModel;
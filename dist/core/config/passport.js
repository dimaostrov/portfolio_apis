"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../../models/user"));

var _settings = _interopRequireDefault(require("./settings"));

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = _settings.default.secret;
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    _user.default.findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
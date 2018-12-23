"use strict";

var passport = require('passport');

require('../core/config/passport')(passport);

var authenticator = function authenticator() {
  return passport.authenticate('jwt', {
    session: false
  });
};

var tokenize = function tokenize(x, req, res) {
  var token = getToken(req.headers);

  if (token) {
    return x;
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unathorized.'
    });
  }
};

var getToken = function getToken(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');

    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  authenticator: authenticator,
  tokenize: tokenize
};
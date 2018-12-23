const passport = require('passport');
require('../core/config/passport')(passport);

const authenticator = () => {
    return passport.authenticate('jwt', {
        session: false
    });
}

const tokenize = (x, req, res) => {
    const token = getToken(req.headers);
    if (token) {
        return x;
    } else {
        return res.status(403).send({
            success: false,
            msg: 'Unathorized.'
        });
    }
}

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
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
    authenticator,
    tokenize,
}
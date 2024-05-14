const jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const roles = require('../utils/roles');
const AuthorizationError = require('../exceptions/AuthorizationError');
const AuthenticationError = require('../exceptions/AuthenticationError');

function authenticationMiddleware() {
  return (req, res, next) => {
    try {
      const token = req.get('Authorization') || req.headers.Authorization;
      if (!token) {
        throw new AuthenticationError('token tidak valid');
      }

      const tokenString = token.split(' ')[1];

      jwt.verify(tokenString, 'secretkey', (err, decodedToken) => {
        if (err) {
          throw new AuthenticationError('token tidak valid');
        }

        req.user = decodedToken;
        next();
      });
    } catch (error) {
      res.status(error.statusCode).json({
        status: 'fail',
        message: error.message,
      });
    }
  };
}

function authorizationMiddleware(role) {
  return (req, res, next) => {
    try {
      const roleLowerCase = role.toLowerCase();

      if (!roles[roleLowerCase]) {
        throw new InvariantError('role tidak ditemukan');
      }

      if (role === req.user.category) {
        next();
      } else {
        throw new AuthorizationError('anda tidak memiliki akses untuk ini');
      }
    } catch (error) {
      res.status(error.statusCode).json({
        status: 'fail',
        message: error.message,
      });
    }
  };
}

module.exports = { authenticationMiddleware, authorizationMiddleware };

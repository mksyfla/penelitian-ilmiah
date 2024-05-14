const jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const roles = require('../utils/roles');
const AuthorizationError = require('../exceptions/AuthorizationError');

function authMiddleware(role) {
  const roleLowerCase = role.toLowerCase();

  if (!roles[roleLowerCase]) {
    throw new InvariantError('role tidak ditemukan');
  }

  return (req, res, next) => {
    try {
      const token = req.get('Authorization') || req.headers.Authorization;

      if (!token) {
        throw new InvariantError('token tidak valid');
      }

      const tokenString = token.split(' ')[1];

      jwt.verify(tokenString, 'secretkey', (err, decodedToken) => {
        if (err) {
          throw new InvariantError('token tidak valid');
        }

        if (role === decodedToken.category) {
          req.user = decodedToken;
          next();
        } else {
          throw new AuthorizationError('anda tidak memiliki akses untuk ini');
        }
      });
    } catch (error) {
      res
        .status(error.statusCode)
        .json({
          status: 'fail',
          message: error.message,
        });
    }
  };
}

module.exports = { authMiddleware };

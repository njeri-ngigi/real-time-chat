const { verifyJwtToken } = require('../utils/jwt');

const validateAuthentication = async (req, res, next) => {
  const tokenVerified = verifyJwtToken(req.headers.token);
  if (!tokenVerified) return res.status(403).send({ message: 'Authentication failed. Provide a valid token.' });

  req.body.user = tokenVerified.email;
  return next();
};

module.exports = { validateAuthentication };

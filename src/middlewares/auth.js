const { verifyJwtToken } = require('../utils/jwt');

const validateAuthentication = async (req, res, next) => {
  const tokenVerified = verifyJwtToken(req.headers.token);
  if (!tokenVerified) return res.status(403).send({ message: 'authentication failed' });

  return next();
};

module.exports = { validateAuthentication };

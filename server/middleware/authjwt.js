const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.headers['authorization'] || req.headers['Authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken,
};

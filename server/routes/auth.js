const path = require('path');
var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

/**
 * @swagger
 * /v1/auth:
 *   post:
 *     summary: Authentication endpoint
 *     description: Requires username / password body
 *     requestBody:
 *         required: true
 *         content:
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    type: object
 *                    properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *         '200':
 *             description: Successfully received data
 *         '404':
 *             description: User not found
 *         '403':
 *             description: Not enough permissions to find user
 */
router.post('/', function (req, res, next) {
  // Todo: Need to implement checks.
  var token = jwt.sign(
    { username: req.body.username },
    process.env.SECRET_KEY,
    {
      expiresIn: 1000 * 60 * 60 * 24, // would expire after 24 hours
    }
  );

  return res.status(200).json({
    expiresIn: 1000 * 60 * 60 * 24,
    token,
  });
});

module.exports = router;

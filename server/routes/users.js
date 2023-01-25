var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     security:
 *         - BearerToken: []
 *     responses:
 *         '200':
 *             description: Successfully return users from users API
 *         '404':
 *             description: User not found
 *         '403':
 *             description: Not enough permissions to find user
 */
router.get('/', function (req, res, next) {
  res.status(200).json({ status: 'success', data: '' });
});

module.exports = router;

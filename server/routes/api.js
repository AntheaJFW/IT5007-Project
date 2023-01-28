var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var authjwt = require('../middleware/authjwt');

var userRouter = require('./user');
var authRouter = require('./auth');

router.use('/v1/auth', authRouter);
router.use('/v1/user', authjwt.verifyToken, userRouter);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    status: 'error',
  });
});

module.exports = router;

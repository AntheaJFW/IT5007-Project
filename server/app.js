var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
const cors = require("cors");

if (process.env.NODE_ENV === 'dev') {
    var corsOptions = {
        origin: "http://localhost:3000"
    };

}

require('dotenv').config();

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');

var app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
);
app.use('/api', apiRouter);
app.use('*', indexRouter); // Has to be last route to allow react to routes and errors

module.exports = app;

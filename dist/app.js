"use strict";

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var cors = require('cors');

var logger = require('morgan');

var helmet = require('helmet');

var compression = require('compression');

require('dotenv').config();

var db = require('./db');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var recipesRouter = require('./routes/recipes');

var citiesRouter = require('./routes/cities');

var app = express();
app.use(cors());
app.use(helmet());
app.use(compression()); //Compress all routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/cities', citiesRouter);
module.exports = app;
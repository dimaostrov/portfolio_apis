const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const logger = require('morgan');
const helmet = require('helmet')
const compression = require('compression');
require('dotenv').config();

const db = require('./db')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const citiesRouter = require('./routes/cities');

const app = express();
app.use(cors())
app.use(helmet())
app.use(compression()); //Compress all routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/cities', citiesRouter);

module.exports = app;

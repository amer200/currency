require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var currencyRouter = require('./routes/currency');
var usersRouter = require('./routes/users');
const {
  mongo,
  Mongoose
} = require('mongoose');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/currency', currencyRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


mongoose.connect(process.env.DB_URL)
  .then(r => {
    console.log('connected to DB');
    app.listen(process.env.PORT, () => {
      console.log(`server is on port =${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
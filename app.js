var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt  = require('jsonwebtoken')
var dotenv = require('dotenv');
const https = require('https');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const book = {
  id : 1,
  name: 'Fallen Demon',
  type: 'book'
};


app.post('/login',(req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(
    {
      data: "foobar",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 30 }
  );
  res.json({accessToken});
})
app.get("/data", authenToken, (req, res) => {
  res.json({ status: "Success", data: book });
});
function authenToken(req, res,next) {
  const authorizationHeader = req.header('Authorization');
  const token =  authorizationHeader.split(' ')[1];
  if(!token){
    res.sendStatus(401);
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
    res.json({book});
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

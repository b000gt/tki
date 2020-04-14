const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const indexRouter = require('./routes/index');
const roomsRouter = require('./routes/room');
const loginMiddleware = require('./middleware/loginMiddleware');
const viewOptionsMiddleware = require('./middleware/viewOptionsMiddleware');

var app = express();
var io = require('socket.io').listen(app.listen(3000));

app.use(session({resave: true, saveUninitialized: true, secret: 'fdagrwwgr', cookie: { maxAge: 600000 }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
  console.log('client connect');
  socket.on('echo', function (data) {
    console.log('echo: '+ data);
    io.sockets.emit('message', data);
  });
  socket.on('start room', function(roomId){
    io.sockets.emit('start room ' + roomId, roomId);
  });
  socket.on('stop room', function(roomId){
    io.sockets.emit('stop room ' + roomId, roomId);
  });
});

app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use(loginMiddleware);
app.use(viewOptionsMiddleware);
app.use('/', indexRouter);
app.use('/room', roomsRouter);

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
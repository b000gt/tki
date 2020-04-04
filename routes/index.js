const express = require('express');
const router = express.Router();
const roomManager = require('../objects/roomManager');
const userManager = require('../objects/userManager');
const User = require('../objects/user');
const Room = require('../objects/room');
const io = require('socket.io');

router.get('/', function(req, res, next){
  if(req.session.user && req.session.user.name != ''){
    console.log('redirecting to /overview');
    res.redirect('/overview');
  } else{
    res.render('index');
  }
});

router.get('/overview', function(req, res, next) {
  req.viewOptions['rooms'] = roomManager.rooms;
  res.render('overview', req.viewOptions);
});

router.post('/', function(req, res, next){
  let user = new User(req.body.name, userManager.getNextId());
  req.session.user = user;
  res.redirect('/overview');
});

module.exports = router;

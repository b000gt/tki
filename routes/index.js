const express = require('express');
const router = express.Router();
const roomManager = require('../objects/roomManager');
const userManager = require('../objects/userManager');
const User = require('../objects/user');
const Room = require('../objects/room');

router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/logout', function(req, res, next){
  let roomId = null;
  for(let index in roomManager.rooms){
    if(roomManager.rooms[index].players[req.session.user.id]){
      roomId = roomManager.rooms[index].id;
      roomManager.rooms[index].leave(req.session.user);
      if(Object.keys(roomManager.rooms[index].players).length == 0){
        roomManager.deleteRoom(roomManager.rooms[index]);
        req.io.emit('rooms changed');
      }
      req.io.emit('left room ' + roomId, req.session.user);
    }
  }
  delete req.session.user;
  res.redirect('/');
});

router.get('/overview', function(req, res, next) {
  req.viewOptions['rooms'] = roomManager.rooms;
  res.render('overview', req.viewOptions);
});

router.post('/', function(req, res, next){
  let user = new User(req.body.name, userManager.getNextId());
  user.color = req.body.color;
  req.session.user = user;
  res.redirect('/overview');
  req.io.emit('toast', '<p class="'+user.color+'-text">User: ' + user.name + ' connected</p>');
});

module.exports = router;

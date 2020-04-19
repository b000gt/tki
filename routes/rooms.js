var express = require('express');
var router = express.Router();
const roomManager = require('../objects/roomManager');
const Room = require('../objects/room');

router.get('/new', function(req, res, next) {
  req.viewOptions['roomname'] = req.viewOptions.user.name + '\'s Room'
  res.render('newRoom', req.viewOptions);
});

router.post('/add', function(req, res, next){
  let newRoom = new Room(req.body.name, roomManager.getNextId(), req.session.user);
  roomManager.addRoom(newRoom);
  req.io.emit('toast', 'Room: ' + newRoom.name + ' created');
  req.io.emit('rooms changed');
  res.redirect('/rooms/'+newRoom.id+'/enter');
});

router.get('/:id/enter', function(req, res, next){
  let room = roomManager.rooms[req.params.id];
  if(room != undefined){
    if(room.canEnter(req.session.user)){
      if(!room.players[req.session.user.id]){
        room.enter(req.session.user);
        req.io.emit('entered room ' + room.id, req.session.user);
      }
      req.viewOptions['room'] = room;
      console.log(room);
      res.render('room', req.viewOptions);
    } else{
      req.session.warning = 'Room is Full';
      res.redirect('/overview');
    }
  } else{
    req.session.warning = 'Room does not exist';
    res.redirect('/overview');
  }
});

router.get('/:id/leave', function(req, res, next){
  let room = roomManager.rooms[req.params.id];
  if(room != undefined){
    room.leave(req.session.user);
    if(Object.keys(room.players).length == 0){
      roomManager.deleteRoom(room);
      req.io.emit('rooms changed');
    }
    req.io.emit('left room ' + room.id, req.session.user);
    res.redirect('/overview');
  } else{
    req.session.warning = 'Room does not exist';
    res.redirect('/overview');
  }
});

router.get('/:id/start', function(req, res){
  console.log('start game..');
  let room = roomManager.rooms[req.params.id];
  if(room != undefined){
    room.start();
  }
  res.send();
});

router.get('/:id/stop', function(req, res){
  let room = roomManager.rooms[req.params.id];
  if(room != undefined){
    room.stop();
  }
  res.send();
});
module.exports = router;

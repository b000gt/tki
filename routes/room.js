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
  req.io.emit('new room', newRoom);
  res.redirect('/room/enter/'+newRoom.id);
});

router.get('/enter/:id', function(req, res, next){
  let rooms = roomManager.rooms.filter((room) => {return room.id == req.params.id});
  if(rooms.length == 1){
    let room = rooms[0];
    if(room.canEnter(req.session.user)){
      if(!room.players[req.session.user.id]){
        room.enter(req.session.user);
        req.io.emit('entered room ' + room.id, req.session.user);
      }
      req.viewOptions['room'] = room;
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

router.get('/leave/:id', function(req, res, next){
  let rooms = roomManager.rooms.filter((room) => {return room.id == req.params.id});
  if(rooms.length == 1){
    let room = rooms[0];
    room.leave(req.session.user);
    req.io.emit('left room ' + room.id, req.session.user);
    res.redirect('/overview');
  } else{
    req.session.warning = 'Room does not exist';
    res.redirect('/overview');
  }
});

router.get('/getAll', function(req, res, next){
  res.json(roomManager.rooms);
});
module.exports = router;

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
  res.redirect('/room/enter/'+newRoom.id);
});

router.get('/enter/:id', function(req, res, next){
  let rooms = roomManager.rooms.filter((room) => {return room.id == req.params.id});
  if(rooms.length == 1){
    let room = rooms[0];
    if(room.canEnter(req.session.user.id)){
      room.enter(req.session.user.id);
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

  } else{
    req.session.warning = 'Room does not exist';
    res.redirect('/overview');
  }
});

router.post('/getAll', function(req, res, next){
  res.json(roomManager.rooms);
});
module.exports = router;

const express = require('express');
const router = express.Router();
const roomManager = require('../objects/roomManager');
const Room = require('../objects/room');

router.get('/', function(req, res, next){
  res.render('index');
});
router.get('/overview', function(req, res, next) {
  let warning;
  if(req.session.warning){
    warning = req.session.warning;
    delete req.session.warning;
  }
  res.render('overview', { rooms: roomManager.rooms, hasWarning: warning?true:false, warning: warning , username: req.session.username});
});
router.post('/setUser', function(req, res, next){
  req.session.username = req.body.name;
  res.redirect('/overview');
});
router.get('/newRoom', function(req, res, next){
  res.render('newRoom', {roomname: req.session.username + '\'s Room'});
});
router.post('/addRoom', function(req, res, next){
  let newRoom = new Room(req.body.name, roomManager.getNextId());
  roomManager.addRoom(newRoom);
  res.redirect('/room/'+newRoom.id);
});
router.get('/room/:id', function(req, res, next){
  let rooms = roomManager.rooms.filter((room) => {return room.id == req.params.id});
  if(rooms.length == 1){
    let room = rooms[0];
    console.log(room);
    res.render('room', { room: room });
  } else{
    req.session.warning = 'Room does not exist';
    res.redirect('/overview');
  }
});

module.exports = router;

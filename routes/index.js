const express = require('express');
const router = express.Router();
const roomManager = require('../objects/roomManager');
const userManager = require('../objects/userManager');
const User = require('../objects/user');
const Room = require('../objects/room');

router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/overview', function(req, res, next) {
  req.viewOptions['rooms'] = roomManager.rooms;
  res.render('overview', req.viewOptions);
});

router.post('/', function(req, res, next){
  let user = new User(req.body.name, userManager.getNextId());
  req.session.user = user;
  res.redirect('/overview');
  req.io.emit('toast', 'User: ' + user.name + ' connected');
});

module.exports = router;

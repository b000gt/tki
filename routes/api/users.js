var express = require('express');
var router = express.Router();
const roomManager = require('../../objects/roomManager');
const Room = require('../../objects/room');

router.get('/', function(req, res, next) {
    res.json(req.session.user);
});
router.post('/changeColor', function(req, res, next) {
    const rooms = roomManager.rooms;
    req.session.user.color = req.body.color;
    for(let index in rooms){
        if(rooms[index].players[req.session.user.id] != null){
            rooms[index].players[req.session.user.id] = req.session.user;
        }
    }
    req.io.emit('user changed', req.session.user);
    res.send(req.session.user);
});
module.exports = router;
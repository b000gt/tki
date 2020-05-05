var express = require('express');
var router = express.Router();
const roomManager = require('../../objects/roomManager');
const Room = require('../../objects/room');

router.get('/', function(req, res, next) {
    res.json(roomManager.rooms);
});
router.get('/:id', function(req, res, next) {
    let room = roomManager.rooms[req.params.id];
    if(room != undefined){
        res.json(room);
    }
});
router.get('/:id/play/:position', function(req, res){
    let room = roomManager.rooms[req.params.id];
    if(room != undefined){
        if(room.turn.id == req.session.user.id) {
            room.put(req.params.position, req.session.user);
            room.nextPlayer();
        }
        res.json(room);
    }
});
module.exports = router;
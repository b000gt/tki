module.exports = function (io){
    return function socketHandler(socket){
        socket.on('user connected', function(name){
            io.emit('snackbar', {title: 'User connected', body: name + ' had connected'});
        });
        socket.on('room created', function(roomname){
            io.emit('snackbar', {title: 'Room created', body: roomname + ' created'});
        });
        socket.on('game started', function(gameId){
            console.log('started with id: ' + gameId);
            io.emit('start game ' + gameId, gameId);
        })
    }
};
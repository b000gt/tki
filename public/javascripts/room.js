console.log('javascripts/room.js loaded');
function updateRoom(roomId){
    fetch('/api/rooms/' + roomId).then(
        res => {
            return res.json();
        }
    ).then(
        data => {
            $('#roomname').innerText = data.name;
            $('.player').remove();
            for(var playerId in data.players){
                $('#room-infos').append('' +
                    '<li class="collection-item player" id="player-'+playerId+'">'+data.players[playerId]+'</li>');
            }
            if(data.hasStarted){
                $("#start-room-"+roomId).addClass('hide');
                $("#stop-room-"+roomId).removeClass('hide');
                $("#board").removeClass('hide');
            } else{
                $("#stop-room-"+roomId).addClass('hide');
                $("#start-room-"+roomId).removeClass('hide');
                $("#board").addClass('hide');
            }
        }
    );
}
function updateBoard(roomId){
    fetch('/api/rooms/' + roomId).then(
        res => {
            return res.json();
        }
    ).then(
        data => {
            let x, y;
            for(y = 0; y < data.dimensions.y; y++){
                for(x = 0; x < data.dimensions.x; x++){
                    $("#board tr.data-row-"+y+" .data-pos-"+x).text(data.board[y][x]);
                }
            }
        });
}
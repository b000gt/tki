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
            } else{
                $("#stop-room-"+roomId).addClass('hide');
                $("#start-room-"+roomId).removeClass('hide');
            }
        }
    );
}
console.log('javascripts/room.js loaded');
let globalRoomId = null;
let globalUserId = null;
function init(id, userId){
    globalRoomId = id;
    globalUserId = userId;
    updateRoom(globalRoomId);
    updateBoard(globalRoomId);
}
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
                    '<li class="collection-item player '+data.players[playerId].color+'-text" id="player-'+playerId+'">'+data.players[playerId].name+'<span class="secondary-content '+data.players[playerId].color+'-text hide" id="'+playerId+'-turn-playerlist"><-</span></li>');
            }
            if(data.hasStarted){
                $("#turn").removeClass('hide');
                $("#start-room-"+roomId).addClass('hide');
                $("#board").removeClass('hide');
            } else{
                $("#turn").addClass('hide');
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
            if(data.winner) {
                $("#turn").addClass('hide');
                $("#winner").removeClass('hide');
                $("#winner-name").text(data.winner.name);
                $("#winner-name").addClass(data.winner.color+'-text');
                $("#restart-room-"+data.id).removeClass('hide');
                updateButtons(false);
            } else{
                $("[id$=-turn-playerlist]").addClass('hide');
                $("#"+data.turn.id+"-turn-playerlist").removeClass('hide');
                $("#player-turn").text(data.turn.name);
                $("#player-turn").removeClass(function(index, name){
                    if(name.indexOf('-text') > 0){
                        return name;
                    }
                });
                $("#player-turn").addClass(data.turn.color + '-text');
                $("#restart-room-"+data.id).addClass('hide');
                $("#winner").addClass('hide');
                if(data.turn.id != globalUserId){
                    updateButtons(false);
                } else{
                    updateButtons(true);
                }
            }
            let x, y;
            for (y = 0; y < data.dimensions.y; y++) {
                for (x = 0; x < data.dimensions.x; x++) {
                    if (data.board[y][x] != null) {
                        $("#board tr.data-row-" + y + " .data-pos-" + x).html('<span class="' + data.board[y][x].color + ' btn" title="'+data.board[y][x].name+'"></span>');
                    } else {
                        $("#board tr.data-row-" + y + " .data-pos-" + x).html('<span class="grey btn"></span>');
                    }
                }
            }
        });
}
function updateButtons(enable = true){
    if(enable){
        $('.move').unbind('click', moveClick);
        $('.move').bind('click', moveClick);
        $('.move').removeClass('grey');
    } else{
        $('.move').unbind('click', moveClick);
        $('.move').addClass('grey');
    }

}
function moveClick(obj){
    let position = $(this).attr('data-position');
    fetch('/api/rooms/' + globalRoomId + '/play/'+position).then(
        res => {
            socket.emit('change board', globalRoomId);
        }
    );
}
console.log('javascripts/overview.js loaded');
function updateRooms(){
    fetch('/api/rooms/').then(
        res => {
            return res.json();
        }
    ).then(
        data => {
            $('.room').remove();
            for(let room in data){
                $('#roomList').append('' +
                    '<div class="col s4 room">\n' +
                    '        <div class="card cyan lighten-2 hoverable">\n' +
                    '            <div class="card-content">\n' +
                    '                <div class="card-title">'+data[room].name+'</div>\n' +
                    '                Created by: '+data[room].createdBy.name+'\n' +
                    '                <div class="card-action"><a href="/rooms/'+data[room].id+'/enter" class="btn waves-effect cyan lighten-5 black-text">Enter Room</a></div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>')
            };
        }
    );
}
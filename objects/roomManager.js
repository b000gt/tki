class RoomManager{
    constructor(){
        this.rooms = [];
        this.idCounter = 0;
    }
    addRoom(room){
        this.rooms.push(room);
    }
    getNextId(){
        return this.idCounter ++;
    }
    deleteRoom(room){
        this.rooms = array.filter(function(value, index, arr){
            return value != room;
        });
    }
}
module.exports = new RoomManager();
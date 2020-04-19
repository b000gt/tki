class RoomManager{
    constructor(){
        this.rooms = {};
        this.idCounter = 0;
    }
    addRoom(room){
        this.rooms[room.id] = room;
    }
    getNextId(){
        return this.idCounter ++;
    }
    deleteRoom(room){
        delete this.rooms[room.id];
    }
}
module.exports = new RoomManager();
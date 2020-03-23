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
}
module.exports = new RoomManager();
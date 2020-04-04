module.exports = class Room{
    constructor(name, id, user){
        this.name = name;
        this.id = id;
        this.players = [];
        this.hasStarted = false;
        this.createdBy = user.name;
        this.createdById = user.id;
        this.limit = 2;
    }
    canEnter(userId){
        if(this.players.indexOf(userId) > 0) {
            if (this.players.length > this.limit) {
                return false;
            }
        }
        return true;
    }
    enter(userId){
        if(this.players.indexOf(userId) > 0){
            this.players.push(userId);
        }
    }
};
module.exports = class Room{
    constructor(name, id, user){
        this.name = name;
        this.id = id;
        this.players = {};
        this.hasStarted = false;
        this.createdBy = user;
        this.limit = 2;
    }
    canEnter(user){
        return Object.keys(this.players).length < this.limit || this.players[user.id];
    }
    enter(user){
        if(!this.players[user.id]){
            this.players[user.id] = user.name;
            user.room = this.id;
        }
    }
    leave(user){
        delete this.players[user.id];
        user.room = null;
    }
    start(){
        this.hasStarted = true;
    }
};
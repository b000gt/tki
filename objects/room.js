module.exports = class Room{
    constructor(name, id, user){
        this.name = name;
        this.id = id;
        this.players = {};
        this.hasStarted = false;
        this.createdBy = user;
        this.limit = 2;
        this.dimensions = {
            x: 6,
            y: 8,
        };
        this.board = {};
        let i;
        let y;
        for(i = 0; i < this.dimensions.y; i++){
            this.board[i] = {};
            for(y = 0; y < this.dimensions.x; y++){
                this.board[i][y] = null;
            }
        }
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
    stop(){
        this.hasStarted = false;
    }
    put(position, player){
        var y;
        for(y = 0; y < this.dimensions.y; y++){
            if((y+1) >= this.dimensions.y || this.board[(y+1)][position] != null){
                this.board[y][position] = player.name;
                return;
            }
        }
    }
};
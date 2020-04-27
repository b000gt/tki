DIRECTIONS = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3, UPLEFT: 4, UPRIGHT: 5, DOWNLEFT: 6, DOWNRIGHT: 7 };
module.exports = class Room{
    constructor(name, id, user, players = 2){
        this.name = name;
        this.id = id;
        this.players = {};
        this.hasStarted = false;
        this.createdBy = user;
        this.limit = players;
        this.dimensions = {
            x: 10,
            y: 6,
        };
        this.board = {};
        this.resetBoard();
        this.winner = null;
        this.turn = user.id;
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
                this.board[y][position] = player;
                if(this.hasWon(position, y, 0, DIRECTIONS.UP, player) || this.hasWon(position, y, 0, DIRECTIONS.DOWN, player) || this.hasWon(position, y, 0, DIRECTIONS.LEFT, player) || this.hasWon(position, y, 0, DIRECTIONS.RIGHT, player)
                    || this.hasWon(position, y, 0, DIRECTIONS.UPLEFT, player) || this.hasWon(position, y, 0, DIRECTIONS.UPRIGHT, player) || this.hasWon(position, y, 0, DIRECTIONS.DOWNLEFT, player) || this.hasWon(position, y, 0, DIRECTIONS.DOWNRIGHT, player)){
                    this.winner = player;
                    return true;
                } else{
                    return false;
                }
            }
        }
    }
    hasWon(posX, posY, before, direction, player){
        if(posY < 0 || posX < 0 || posY >= this.dimensions.y || posX >= this.dimensions.x || this.board[posY][posX] === null || this.board[posY][posX].id != player.id){
            return false;
        } else if(before >= 3) {
            return true;
        } else {
            switch(direction){
                case DIRECTIONS.UP:
                    return this.hasWon(posX, parseInt(posY - 1), before + 1, direction, player); // unnötig
                case DIRECTIONS.DOWN:
                    return this.hasWon(posX, parseInt(posY + 1), before + 1, direction, player);
                case DIRECTIONS.LEFT:
                    return this.hasWon(parseInt(posX - 1), posY, before + 1, direction, player); // unnötig
                case DIRECTIONS.RIGHT:
                    return this.hasWon(parseInt(posX + 1), posY, before + 1, direction, player);
                case DIRECTIONS.UPLEFT:
                    return this.hasWon(parseInt(posX - 1), parseInt(posY -1), before + 1, direction, player);
                case DIRECTIONS.UPRIGHT:
                    return this.hasWon(parseInt(posX + 1), parseInt(posY + 1), before + 1, direction, player);
                case DIRECTIONS.DOWNLEFT:
                    return this.hasWon(parseInt(posX - 1), parseInt(posY + 1), before + 1, direction, player);
                case DIRECTIONS.DOWNRIGHT:
                    return this.hasWon(parseInt(posX + 1), parseInt(posY - 1), before + 1, direction, player);
            }
        }
    }
    resetBoard(){
        this.winner = null;
        let i;
        let y;
        for(i = 0; i < this.dimensions.y; i++){
            this.board[i] = {};
            for(y = 0; y < this.dimensions.x; y++){
                this.board[i][y] = null;
            }
        }
    }

    nextPlayer(){
        let isNext = this.turn == null;
        for(let index in this.players){
            console.log('isNext', isNext);
            console.log(this.players[index], index);
            if(isNext){
                this.turn = index;
                return true;
            }
            if(this.turn == index){
                isNext = true;
            }
        }
        for(let index in this.players){
            this.turn = index;
            return true;
        }
    }
};
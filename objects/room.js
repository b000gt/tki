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
            this.players[user.id] = user;
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
                if(this.hasWon(position, y, player)){
                    this.winner = player;
                    return true;
                } else{
                    return false;
                }
            }
        }
    }
    hasWon(posX, posY, player){
        if(this.checkPlayer(parseInt(posX) - 1, posY, 0, player, DIRECTIONS.LEFT) + this.checkPlayer(parseInt(posX) + 1, posY, 0, player, DIRECTIONS.RIGHT) >= 3 ||
            this.checkPlayer(posX, parseInt(posY) - 1, 0, player, DIRECTIONS.UP) + this.checkPlayer(posX, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWN) >= 3 ||
            this.checkPlayer(parseInt(posX) - 1, parseInt(posY) - 1, 0, player, DIRECTIONS.UPLEFT) + this.checkPlayer(parseInt(posX) + 1, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWNRIGHT) >= 3 ||
            this.checkPlayer(parseInt(posX) + 1, parseInt(posY) - 1, 0, player, DIRECTIONS.UPRIGHT) + this.checkPlayer(parseInt(posX) - 1, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWNLEFT) >= 3){
            return true;
        } else {
            /* console.log('player', player.color, 'position', posX, '/', posY);
            * console.log('\tleft:', this.checkPlayer(parseInt(posX) - 1, posY, 0, player, DIRECTIONS.LEFT), 'right:', this.checkPlayer(parseInt(posX) + 1, posY, 0, player, DIRECTIONS.RIGHT));
            * console.log('\tup:', this.checkPlayer(posX, parseInt(posY) - 1, 0, player, DIRECTIONS.UP), 'down:', this.checkPlayer(posX, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWN));
            * console.log('\tupleft:', this.checkPlayer(parseInt(posX) - 1, parseInt(posY) - 1, 0, player, DIRECTIONS.UPLEFT), 'downright:', this.checkPlayer(parseInt(posX) + 1, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWNRIGHT));
            * console.log('\tupright:', this.checkPlayer(parseInt(posX) + 1, parseInt(posY) - 1, 0, player, DIRECTIONS.UPLEFT), 'downleft:', this.checkPlayer(parseInt(posX) - 1, parseInt(posY) + 1, 0, player, DIRECTIONS.DOWNRIGHT));
            */
            return false;
        }
    }
    checkPlayer(posX, posY, amount, player, direction){
        // console.log('checking', posX, '/', posY);
        if(posX < 0 || posX >= this.dimensions.x || posY < 0 || posY >= this.dimensions.y){
            return amount;
        } else if(this.board[posY][posX] == null || this.board[posY][posX].id != player.id){
            return amount;
        } else{
            switch(direction){
                case DIRECTIONS.UP:
                    return this.checkPlayer(posX, parseInt(posY) - 1, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.DOWN:
                    return this.checkPlayer(posX, parseInt(posY) + 1, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.LEFT:
                    return this.checkPlayer(parseInt(posX) - 1, posY, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.RIGHT:
                    return this.checkPlayer(parseInt(posX) + 1, posY, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.UPLEFT:
                    return this.checkPlayer(parseInt(posX) - 1, parseInt(posY) - 1, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.UPRIGHT:
                    return this.checkPlayer(parseInt(posX) + 1, parseInt(posY) - 1, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.DOWNLEFT:
                    return this.checkPlayer(parseInt(posX) - 1, parseInt(posY) + 1, parseInt(amount) + 1, player, direction);
                case DIRECTIONS.DOWNRIGHT:
                    return this.checkPlayer(parseInt(posX) + 1, parseInt(posY) + 1, parseInt(amount) + 1, player, direction);
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
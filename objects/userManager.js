class UserManager{
    constructor(){
        this.users = {};
        this.idCounter = 0;
    }
    addUser(user){
        this.users[user.id] = user;
    }
    getNextId(){
        return this.idCounter ++;
    }
}
module.exports = new UserManager();
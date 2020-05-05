$(".color-change").click(function(e){
    e.preventDefault();
    const color = this.getAttribute('href');
    fetch('/api/users/changeColor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color }),
    });
});
function init(userId){
    var socket = io();
    M.AutoInit();
    socket.on('toast', function(msg){
        M.toast({
            html: msg,
            classes: 'rounded'
        });
    });
    socket.on('user changed', function(user){
        if(userId == user.id){
            $("#user-btn").removeClass(function(){
                const classes = this.className.split(' ');
                let classesToRemove = [];
                for(let index in classes){
                    if(classes[index].indexOf('-text') > 0) {
                        classesToRemove.push(classes[index]);
                    }
                }
                return classesToRemove;
            });
            $("#user-btn").addClass(user.color+"-text");
        }
    });
    $(".dropdown-trigger").dropdown();
}
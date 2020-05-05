module.exports = function loginMiddleware(req, res, next){
    let allowedInRoom = [];
    if(req.session.user){
        allowedInRoom = [
            '/rooms/' + req.session.user.room + '/leave',
            '/rooms/' + req.session.user.room + '/enter',
            '/rooms/' + req.session.user.room + '/start',
            '/rooms/' + req.session.user.room + '/stop',
            '/rooms/' + req.session.user.room + '/delete',
            '/rooms/' + req.session.user.room + '/restart',
            '/overview/noRedirect',
            '/logout',
        ];
    }
    if((!req.session.user || req.session.user.name == '' ) && req.originalUrl != '/' && !req.originalUrl.startsWith('/api')){
        req.session.warning = 'Please log in first';
        console.log('redirecting to /');
        res.redirect('/');
    } else if(req.session.user && req.session.user.name != '' && req.originalUrl == '/'){
        console.log('redirecting to /overview');
        res.redirect('/overview');
    }
    if(req.session.user && req.session.user.room != null && !(allowedInRoom.includes(req.originalUrl)|| req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/favicon'))){
        res.redirect('/rooms/' + req.session.user.room + '/leave');
    } else{
        next();
    }
};
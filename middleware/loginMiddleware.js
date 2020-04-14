module.exports = function loginMiddleware(req, res, next){
    if((!req.session.user || req.session.user.name == '' ) && req.originalUrl != '/'){
        req.session.warning = 'Please log in first';
        console.log('redirecting to /');
        res.redirect('/');
    } else if(req.session.user && req.session.user.name != '' && req.originalUrl == '/'){
        console.log('redirecting to /overview');
        res.redirect('/overview');
    }
    if(req.session.user && req.session.user.room != null && !(req.originalUrl == '/room/leave/' + req.session.user.room || req.originalUrl == '/room/enter/' + req.session.user.room)){
        res.redirect('/room/leave/' + req.session.user.room);
    }
    next();
};
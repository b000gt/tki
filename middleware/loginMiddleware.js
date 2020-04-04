module.exports = function loginMiddleware(req, res, next){
    if((!req.session.user || req.session.user.name == '' ) && req.originalUrl != '/'){
        console.log('redirecting to /');
        res.redirect('/');
    } else{
        next();
    }
};
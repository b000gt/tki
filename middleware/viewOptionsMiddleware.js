module.exports = function viewOptionsMiddleware(req, res, next){
    req['viewOptions'] = {};
    let warning;
    if(req.session.warning){
        warning = req.session.warning;
        delete req.session.warning;
    }
    req.viewOptions['warning'] = warning;
    req.viewOptions['user'] = req.session.user;
    next();
};
module.exports = {
    ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
      
    else
    {
        req.flash('error_msg',"You are Not authorized");
        res.redirect('/users/login');
    }
    
  }
};
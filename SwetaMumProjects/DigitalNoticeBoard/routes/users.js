var express = require('express');
var router = express.Router();

var loggedinController = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

var loggedinAPI = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send( {message : 'Please login' } );
  }
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/authorizedView', loggedinController, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

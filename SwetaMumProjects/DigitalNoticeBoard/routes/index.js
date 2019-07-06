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


var checkAdminAccess = function (req, res, next) {
  if (req.user.role == "Admin") {
    next()
  } else {
    res.status(403).send();
  }
}

var checkTeacherAccess = function (req, res, next) {
  if (req.user.role == "Teacher" || req.user.role == "Admin") {
    next()
  } else {
    res.status(403).send();
  }
}

var checkStudentAccess = function (req, res, next) {
  if (req.user.role == "Student" || req.user.role == "Admin") {
    next()
  } else {
    res.status(403).send();
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get('/login', function (req, res, next) {
  res.render('login');
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});


router.get('/profile', loggedinController, function (req, res, next) {
  res.render('profile', {
    user: req.user
  })
});

router.get('/adminProfile', loggedinController, checkAdminAccess, function (req, res, next) {
  res.render('adminProfile', {
    user: req.user
  })
});

router.get('/studentProfile', loggedinController, checkStudentAccess, function (req, res, next) {
  res.render('studentProfile', {
    user: req.user
  })
});

router.get('/teacherProfile', loggedinController, checkTeacherAccess, function (req, res, next) {
  res.render('teacherProfile', {
    user: req.user
  })
});


router.get('/archieved/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
module.exports = router;
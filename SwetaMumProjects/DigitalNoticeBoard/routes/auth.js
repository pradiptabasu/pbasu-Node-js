var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */


module.exports = function (passport) {

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

    router.post('/archieved/signup', function (req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
            } else {
                if (doc) {
                    res.status(500).send('Username already exists')
                } else {
                    var record = new User()
                    record.username = username;
                    record.password = record.hashPassword(password)
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    });

    router.post('/signupController', function (req, res) {
        var body = req.body,
        username = body.username,
        password = body.password;
        signupCore(username, password)
        .then(function (signupResult) {
            console.log(signupResult);
            if (signupResult.statusCode == 200) {
                return res.redirect("/login");
            }
            else if (signupResult.statusCode == 500) {
                return res.redirect("/signup");
            } 
            else if (signupResult.statusCode == 501) {
                return res.redirect("/signup");
            } 
            else if (signupResult.statusCode == 502) {
                return res.redirect("/signup");
            }
            else {
                return res.redirect("/adminProfile");
            }
        });
    });

    router.post('/signup', function (req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
        signupCore(username, password)
            .then(function (signupResult) {
                console.log(signupResult);
                if (signupResult.statusCode == 200) {
                    return res.status(signupResult.statusCode).json(signupResult.message);
                } else {
                    return res.status(signupResult.statusCode).json(signupResult.message);
                }
            });
    });

    router.post('/archieved/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
    }), function (req, res) {
        res.send('hey')
    })

    router.post('/loginController', function (req, res, next) {
        loginCore(req, res, next)
            .then(function (loginResult) {
                //console.log(loginResult);
                if (loginResult.statusCode == 200 && loginResult.user.role == "Admin") {
                    return res.redirect("/adminProfile");
                } else if (loginResult.statusCode == 200 && loginResult.user.role == "Teacher") {
                    return res.redirect("/teacherProfile");
                } else if (loginResult.statusCode == 200 && loginResult.user.role == "Student") {
                    return res.redirect("/studentProfile");
                } else if (loginResult.statusCode == 200) {
                    return res.redirect("/profile");
                } else {
                    return res.redirect("/login");
                }
            });
    });

    router.post('/login', function (req, res, next) {
        loginCore(req, res, next)
            .then(function (loginResult) {
                console.log(loginResult);
                if (loginResult.statusCode == 200) {
                    return res.status(loginResult.statusCode).json(loginResult.user);
                } else {
                    return res.status(loginResult.statusCode).json(loginResult.error);
                }
            });
    });

    router.get('/logoutController', function (req, res) {
        req.logout()
        return res.redirect('/')
    })

    router.get('/logout', function (req, res) {
        req.logout()
        return res.status(200).json({message: 'Successfully Logged Out'});
    })

    router.get('/testAPI', loggedinAPI, function (req, res) {
        return res.status(200).json({message: 'Successfully called testAPI'});
    })

    router.get('/testAPIController', loggedinController, function (req, res) {
        return res.status(200).json({message: 'Successfully called testAPIController'});
    })

    function loginCore(req, res, next) {
        var authenticationStatus = {};
        return new Promise((resolve, reject) => {
            passport.authenticate('local', function (err, user, info) {
                //console.log("REQUEST ++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
                //console.log(req);
                //console.log("RESPONSE ++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
                //console.log(res);
                //console.log("ERROR ++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
                //console.log(err);
                //console.log("USER ++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
                //console.log(user);
                //console.log("INFO ++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
                //console.log(info);
                if (err) {
                    //console.log("err");
                    authenticationStatus['statusCode'] = 501;
                    authenticationStatus['error'] = err;
                    //return authenticationStatus;
                    //return res.status(501).json(err);
                } else if (!user) {
                    //console.log("!user");
                    authenticationStatus['statusCode'] = 401;
                    authenticationStatus['error'] = "Invalid login";
                    //return authenticationStatus;
                    //return res.status(501).json(info);
                } else {
                    req.logIn(user, function (err) {
                        if (err) {
                            //console.log("logIn err");
                            authenticationStatus['statusCode'] = 501;
                            authenticationStatus['error'] = err;
                            //return authenticationStatus;
                            //return res.status(501).json(err);
                        }

                        authenticationStatus['statusCode'] = 200;
                        authenticationStatus['message'] = 'Login Success';
                        authenticationStatus['user'] = user;
                        //return authenticationStatus;
                        // return res.status(200).json({
                        //     message: 'Login Success'
                        // });
                    });
                }
                //console.log(authenticationStatus);
                // return new Promise((resolve, reject) => {
                //     resolve(authenticationStatus);
                // })
                resolve(authenticationStatus);
            })(req, res, next);
        });
    };

    function signupCore(username, password) {
        var signupStatus = {};
        return new Promise((resolve, reject) => {
            User.findOne({
                username: username
            }, function (err, doc) {
                if (err) {
                    signupStatus['statusCode'] = 501;
                    signupStatus['message'] = 'error occured';
                    signupStatus['error'] = err;
                    resolve(signupStatus);
                } else {
                    if (doc) {
                        signupStatus['statusCode'] = 500;
                        signupStatus['message'] = 'Username already exists';
                        //res.status(500).send('Username already exists')
                        resolve(signupStatus);
                    } else {
                        var record = new User()
                        record.username = username;
                        record.password = record.hashPassword(password)

                        record.save()
                            .then(saveResult => {
                                //console.log(saveResult);
                                signupStatus['statusCode'] = 200;
                                signupStatus['message'] = 'User registered';
                                //res.redirect('/login')
                                resolve(signupStatus);
                            })
                            .catch(err => {
                                signupStatus['statusCode'] = 502;
                                signupStatus['message'] = 'db error';
                                signupStatus['error'] = err;
                                //res.status(500).send('db error')
                                resolve(signupStatus);
                            })
                    }
                }
            })
        })
    }

    return router;
};
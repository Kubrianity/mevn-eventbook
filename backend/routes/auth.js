const express = require('express')
const router = express.Router()
const PersonModel = require('../models/person')
const PersonService = require('../services/person-service')
const passport = require('passport')

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/register', (req, res, next) => {
    const user = new PersonModel({username : req.body.username})
    PersonModel.register( user, req.body.password, (err, account) => {
        if(err) {
          res.sendStatus(401)
          return
        }
        PersonService.add(account)
        req.login(user, function(err) {
          if(err) return next(err)
          res.send(req.user)
        });
    })
})

router.post('/login',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  (req, res) => { // when authentication succeeds, the req.user property is set to the authenticated user
    res.send(req.user);
});

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.send('success!');
    });
  });

module.exports = router
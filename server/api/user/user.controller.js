'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  console.log('create called : ' + JSON.stringify(req.body));
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  console.log('before saveAsync', newUser)
  newUser.save( (err, user) => {
    if(err) { return validationError(res) }
    var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: '60m'
    }); 
    return res.json({ token: token, user: newUser })
  })
  /*newUser.saveAsync()
    .spread(function(user) {
      console.log('checking where')
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: '60m'
      });
      console.log('checking 2nd')
      // adding user to response
      console.log('user ', user)
      res.json({ token: token, user: newUser });
    })
    .catch((err) => { console.log('validationError: ', err);validationError(res) });*/
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

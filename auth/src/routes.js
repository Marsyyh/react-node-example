'use strict'

var express = require('express');
var router = express.Router();
var cors = require('cors');
var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;
var authenticate = require('./Oauth/middleware/authenticate')
var oauth = require('./Oauth/oauth');
var config = require('./constant');
var sqldb = require('./db/sql/models');

// middleware
// cors configration
var whitelist = config.cors.whitelist
var corsOptionsDelegate = (req, cb) => {
  var origin = whitelist.indexOf(req.header('Origin')) !== -1 ? true : false;
  cb(null, {origin: origin})
}

// api endpoints

// test
router.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.json({ message: 'Hey, welcome!'});
});

// Oauth
router.all('/oauth/token', cors(corsOptionsDelegate), (req, res, next) => {
  var request = new Request(req);
  var response = new Response(res);
  var oauthOptions = {
    requireClientAuthentication: {
      'password': false
    }
  };

  oauth
    .token(request, response, oauthOptions)
    .then(token => {
      // Todo: remove unnecessary values in response
      return res.json(token)
    }).catch(err => {
      return res.status(500).json(err)
    })
});


// other routes
router.get('/me', authenticate(), (req, res) => {
  res.json({
    me: req.user
  })
});

router.get('/profile', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req,res) => {
  res.json(getUserPofile(req.user.user));
});

// admin user
router.get('/admin/user', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.User.findAll({
      attributes: ['id', 'username'],
      include: [{
        model: sqldb.Role,
        attributes: ['rolename']
      }]
    }).then(data => {
      data.Roles = data.role
      res.json({user: data})
    })
  } else {
    res.json('Not permission').code(401);
  }
});

router.get('/admin/user/:id', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.User.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'username'],
      include: [{
        model: sqldb.Role
      }]
    }).then(data => {
      data.Roles = data.role
      res.json({user: data})
    })
  } else {
    res.json('Not permission').code(401);
  }
});

router.post('/admin/user/:id/edit', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.User.update({
      username: req.body.name
    }, {
      where: {id: req.params.id}
    }).then(user => {
      return sqldb.UserRole.destroy({
        where: {
          user_id: req.params.id
        }
      });
    }).then(() => {
      var userRole = req.body.roles.map(itm => {
        return {
          role_id: itm,
          user_id: req.params.id
        }
      })
      return sqldb.UserRole.bulkCreate(userRole);
    }).then(() => res.json({message: 'success'}))
    .catch(err => res.json(err).status(500));
  } else {
    res.json('Not permission').code(401);
  }
});

router.post('/admin/user/create', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.User.create({
      username: req.body.name,
      password: 'pass',
      scope: 'profile'
    }).then(user => {
      var userRole = req.body.roles.map(itm => {
        return {
          role_id: itm,
          user_id: user.id
        }
      })
      return sqldb.UserRole.bulkCreate(userRole);
    }).then(() => res.json({message: 'success'}))
    .catch(err => res.json(err).status(500))
    .catch(err => res.json(err).status(500));
  } else {
    res.json('Not permission').code(401);
  }
});

router.get('/admin/user/:id/delete', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.UserRole.destroy({
      where: {
        user_id: req.params.id
      }
    }).then(rows => sqldb.OAuthAccessToken.destory({
        where: {
          user_id: req.params.id
        }
      })
    ).then(() => res.json({message: 'success'}))
    .catch(err => res.json(err).status(500));

  } else {
    res.json('Not permission').code(401);
  }
});

// admin role
router.get('/admin/role', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.Role.findAll({
      attributes: ['id', 'rolename']
    }).then(data => res.json({role: data}))
  } else {
    res.json('Not permission').code(401);
  }
});

// admin policy
router.get('/admin/policy', cors(corsOptionsDelegate), authenticate({scope:'profile'}), (req, res) => {
  var user = getUserPofile(req.user.user);
  if(user.profile.policy.indexOf('canEditUser') != -1){
    sqldb.Policy.findAll({
      attributes: ['id', 'policyname']
    }).then(data => res.json({policy: data}))
  } else {
    res.json('Not permission').code(401);
  }
});

// cors preflight
router.options('/profile', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/user', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/user/:id', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/user/:id/edit', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/user/:id/delete', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/user/create', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/role', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/admin/policy', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});


module.exports = router;

function getUserPofile(data){
  var policies = [];
  for(var role of data.Roles){
    for(var policy of role.Policies){
      if(policies.indexOf(policy.policyname) == -1) {
        policies.push(policy.policyname);
      }
    }
  }
  return {
    profile: {
      username: data.username,
      policy: policies
    }
  }
}

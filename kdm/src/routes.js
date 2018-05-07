'use strict'

var express = require('express');
var router = express.Router();
var cors = require('cors');
var config = require('./constant');
var axios = require('axios');
// middleware
// cors configration
var whitelist = config.cors.whitelist
var corsOptionsDelegate = (req, cb) => {
  var origin = whitelist.indexOf(req.header('Origin')) !== -1 ? true : false;
  cb(null, {origin: origin, credentials: true})
}


// api endpoints
const authMiddleware = perm => {
  return async (req, res, next) => {
    var token = req.body.token;
    if (!token) res.json({message: 'Unauthorized'}).code(401);
    try {
      const response = await axios.get(config.authService.profileUrl, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

      if(response.data.profile.policy.indexOf(perm) != -1){
        console.log(response.data);
        req.body.auth = response.data;
        next();
      } else {
        res.json({message: 'Unauthorized'}).code(401)
      }
    } catch (error) {
      console.log(error);
      res.json({message: 'Unauthorized'}).code(401)
    }
  }
}
// test
router.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.json({ message: 'Hey, welcome!'});
});

router.post('/test', cors(corsOptionsDelegate), authMiddleware('canKdm'), (req, res) => {
  res.json(req.body.auth);
});

router.post('/foo', cors(corsOptionsDelegate), authMiddleware('canTestFoo'), (req, res) => {
  res.json({foo: 'This is foo from kdm server'});
});

router.post('/bar', cors(corsOptionsDelegate), authMiddleware('canTestBar'), (req, res) => {
  res.json({bar: 'This is bar from kdm server'});
});


// cors preflight
router.options('/', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/foo', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/test', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

router.options('/bar', cors(corsOptionsDelegate), (req,res) => {
  res.send('Allowed');
});

module.exports = router;

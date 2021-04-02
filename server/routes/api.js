'use strict';
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
// const cypto = require('crypto')
// cypto.pbkdf2()
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const appRoot = process.cwd();
let privateKEY, publicKEY;

fs.readFile(appRoot + '/routes/private.key', { encoding: 'utf8', flag: 'r' }, (err, data) => {
  if (err) {
    // throw new Error('sdkfj')
    console.log(err);
  } else {
    privateKEY = data;
  }
});

fs.readFile(appRoot + '/routes/public.key', { encoding: 'utf8', flag: 'r' }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    publicKEY = data;
  }
});

var i = 'AyarmzCode Inc.';          // Issuer 
var s = 'ayarmz@user.com';        // Subject 
var a = 'http://localhost.io'; // Audience

var signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: "RS256"
};

var verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: ["RS256"]
};

const dbUri = "mongodb+srv://userayarmz:userayarmz@cluster-ayarmz-code.dodbe.mongodb.net/eventsdb?retryWrites=true&w=majority";
mongoose.connect(dbUri, err => {
  if (err != undefined) {
    console.error('Error ' + err);
  } else {
    console.log('Connect to mongodb');
  }
});

router.get('/', (req, res) => {
  res.send('From API Route');
});

router.post('/register', (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  bcrypt.hash(userPassword, saltRounds, function(err, hash) {
    let userData = { email: userEmail, password: hash }
    let user = new User(userData);
    user.save((error, registeredUser) => {
      if (error != undefined) {
        console.log(error);
      } else {
        let payload = { subject: registeredUser.userId };
        let token = jwt.sign(payload, privateKEY);
        res.status(200).send({ token });
      }
    });
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error != undefined) {
      console.log(error);
    } else {
      if (user == undefined) {
        res.status(401).send('Invalid email');
      } else {
        plainTextPassword = userData.password;
        hash = user.password;
        bcrypt.compare(plainTextPassword, hash, (err, result) => {
          if (err) {
            throw err;
          } else if (!result) {
            res.status(401).send('Invalid password');
          } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, privateKEY, signOptions);
            res.status(200).send({ token });

          }
        });
      }
    }
  });
});

router.get('/events', (req, res) => {
  let events = [
    {

      "userId": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(events);
});

router.post('/new-event', verifyToken, (req, res) => {
  let event = req.body;
  event = new Event(event);
  event.save((err, savedPost) => {
    if (err) {
      console.log(err);
    } else {
      console.log(savedPost);
    }
  })
})

router.get('/specialevents', verifyToken, (req, res) => {
  let events = [
    {
      "userId": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "userId": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(events);
});

function verifyToken(req, res, next) {
  if (req.headers.authorization == undefined) {
    return res.status(401).send('Unauthorized Request');
  } else {
    let token = req.headers.authorization.split(' ')[1];
    // console.log('Token', token);
    if (token === 'null') {
      return res.status(401).send('Unauthorized Request');
    }
    try {
      let payload = jwt.verify(token, publicKEY, verifyOptions);
      let id = payload.subject;
      User.findById(id, (err,     user) => {
        // console.log('Id', user._id);
        if (err != undefined) {
          console.log(err);
        } else if (id == user._id) {
          req.userId = id;
        } else {
          res.status(401).send('Unauthorized Request');
        }
      });
    } catch (error) {
      return res.status(401).send('Unauthorized Request');
    }
    next();
  }

}

module.exports = router;
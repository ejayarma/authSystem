'use strict';
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const appRoot = process.cwd();
let privateKEY, publicKEY;
fs.readFile(appRoot + '/routes/private.key', { encoding: 'utf8', flag: 'r' }, (err, data) => {
  if (err) {
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

var i = 'Mysoft corp';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience

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
  let userData = req.body;
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

router.post('/login', (req, res) => {
  // let mytoken = jwt.sign({ mydata: 'Data is here' }, privateKEY, signOptions);
  // let myOutput = jwt.verify(mytoken, publicKEY, verifyOptions);
  // console.log('myOtput', myOutput);
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error != undefined) {
      console.log(error);
    } else {
      if (user == undefined) {
        res.status(401).send('Invalid email');
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid password');
      } else {
        // console.log(user);
        let payload = { subject: user._id };
        // console.log('Login payload', payload);
        let token = jwt.sign(payload, privateKEY, signOptions);
        res.status(200).send({ token });
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
      User.findById(id, (err, user) => {
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
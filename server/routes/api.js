'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;
const router = express.Router();

const private_key_path = path.normalize(path.join(__dirname, '../private.key'))
const public_key_path = path.normalize(path.join(__dirname, '../public.pem'))
const PRIVATE_KEY = fs.readFileSync(private_key_path, 'utf-8');
const PUBLIC_KEY = fs.readFileSync(public_key_path, 'utf-8');

console.log('PRIVATE_KEY>>>>', PRIVATE_KEY);
console.log('PUBLIC_KEY>>>>', PUBLIC_KEY);
let i = 'AyarmzCode Inc.';          // Issuer 
let s = 'ayarmz@user.com';        // Subject 
let a = 'http://localhost:4200'; // Audience

let signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '12h',
  algorithm: 'RS256'
};

let verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '12h',
  algorithms: ['RS256']
};

const mongodbUri = process.env.MONGODB_URI

mongoose
  .connect(mongodbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: ${x.connections[0].name}`
    );
  })
  .catch(err => {
    console.log('Error connecting to Mongo', err);
  });

router.get('/', (req, res) => {
  res.send('From API Route');
});

router.post('/register', (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  bcrypt.hash(userPassword, saltRounds, (err, hash) => {
    let userData = { email: userEmail, password: hash }
    let user = new User(userData);
    user.save((error, registeredUser) => {
      if (error != undefined) {
        console.log(error);
      } else {
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, PRIVATE_KEY, signOptions);
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
        let plainTextPassword = userData.password;
        let hash = user.password;
        bcrypt.compare(plainTextPassword, hash, (err, result) => {
          if (err) {
            throw err;
          } else if (!result) {
            res.status(401).send('Invalid password');
          } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, PRIVATE_KEY, signOptions);
            res.status(200).send({ token });
          }
        });
      }
    }
  });
});

router.get('/events',  (req, res) => {
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

function verifyToken(req, res, next) {
  if (req.headers.authorization == undefined) {
    return res.status(401).send('Unauthorized Request');
  } else {
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (token === 'null') {
      return res.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token, PUBLIC_KEY, verifyOptions);
    let id = payload.subject;
    User.findById(id, (err, user) => {
      if (err != undefined) {
        throw err;
      } else if (id == user._id) {
        req.userId = id;
        next();
      } else {
        next('router')
      }
    });
  }

}

router.post('/save-event', verifyToken, (req, res) => {
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

router.get('/specialevents', verifyToken, function (req, res) {
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
  if (req.userId) {
    res.json(events); 
  }
});



module.exports = router;
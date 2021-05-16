'use strict';

const express = require('express');
const User = require('../models/user');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const public_key_path = path.normalize(path.join(__dirname, '../public.pem'));
const PUBLIC_KEY = fs.readFileSync(public_key_path, 'utf-8');
let i = 'AyarmzCode Inc.';          // Issuer 
let s = 'ayarmz@user.com';        // Subject 
let a = 'http://localhost:4200'; // Audience

let verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '12h',
  algorithms: ['RS256']
};


const events = express.Router();

events.get('/hello', (req, res) => {
  res.send('From Events Route');
});

events.get('/', (req, res) => {
  Event.find({ attendance_type: 0 }, (err, docs) => {
    if (err != undefined) {
      throw err;
    } else {
      res.json(docs);
    }
  }).exec();
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
        next('events')
      }
    });
  }

}


events.get('/specialevents', verifyToken, function (req, res) {
  Event.find({ attendance_type: 1 }, (err, docs) => {
    if (err != undefined) {
      throw err;
    } else {
      res.json(docs);
    }
  }).exec();
});

events.get("/user-events", verifyToken, function (req, res) {
  if (req.userId != undefined) {
    Event.find({ user_id: req.userId }, (err, docs) => {
      if (err != undefined) {
        throw err;
      } else {
        res.json(docs);
      }
    }).exec();
  }
});

events.post('/save-event', verifyToken, (req, res) => {
  let event = req.body;
  event.user_id = req.userId;
  event = new Event(event);
  event.save((err, newEvent) => {
    if (err) {
      console.log(err);
    } else {
      res.json(newEvent);
    }
  });
});


module.exports = events;
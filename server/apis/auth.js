const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const saltRounds = 10;
const private_key_path = path.normalize(path.join(__dirname, '../private.key'));
const PRIVATE_KEY = fs.readFileSync(private_key_path, 'utf-8');

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


const auth = express.Router();

auth.post('/register', (req, res) => {
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
  
  auth.post('/login', (req, res) => {
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

module.exports = auth;
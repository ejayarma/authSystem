const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();

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
            res.status(200).send(registeredUser);
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        if (error != undefined) {
            console.log(error);
            
        } else {
            if (user == undefined) {
                res.status(401).send('Invalid email');
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                res.status(200).send(user);
            }
        }
    });
});

router.get('/events', (req, res) => {
    let events = [
        {
 
            "_id": "1",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           },
           {
             "_id": "2",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           },
           {
             "_id": "3",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           },
           {
             "_id": "4",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           },
           {
             "_id": "5",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           },
           {
             "_id": "6",
             "name": "Auto Expo",
             "description": "lorem ipsum",
             "date": "2012-04-23T18:25:43.511Z"
           }
    ];
    res.json(events);
});

router.get('/specialevents', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }      
    ];
    res.json(events);
});
module.exports = router;
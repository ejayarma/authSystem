const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    user_id: String,
    name: String,
    description: String,
    type: String,
    date: Date,
    level: String
});

module.exports = mongoose.model('Event', eventSchema, 'events');



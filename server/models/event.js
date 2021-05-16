const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    user_id: String,
    name: String,
    description: String,
    attendance_type: Number,
    date: Date,
    venue: String,
});

module.exports = mongoose.model('Event', eventSchema, 'events');



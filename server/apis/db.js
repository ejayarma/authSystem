require('dotenv').config();
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI
async function connectDb() {
    return await mongoose
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
}

module.exports = connectDb;
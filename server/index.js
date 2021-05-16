const express = require('express');
const cors = require('cors');
const events = require('./apis/events');
const auth = require('./apis/auth');
const connectDb = require('./apis/db');
const PORT = 3000
const app = express();
app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));
app.use(cors());

connectDb();
app.use('/auth', auth)
app.use('/events', events);

app.get('/', (req, res) => {
    res.send('Hello form Server');
});

app.listen(PORT, () => {
    console.log('Server running on localhost: ' + PORT);
});
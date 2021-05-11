const express = require('express');
const cors = require('cors');

const api = require('./routes/api');

const PORT = 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));

app.use(cors());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello form Server');
});

app.listen(PORT, () => {
    console.log('Server running on localhost: ' + PORT);
});
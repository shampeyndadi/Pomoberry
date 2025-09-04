const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Listening to port 3000');
});

app.get('/', (req, res) => {
    res.send('Backend is running');
})
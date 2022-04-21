require('module-alias/register');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true },
() => {
    console.log('connected to DB');
});

// Middleware
app.use(express.json());

// Define routes
require('./routes/all')(app);

app.listen(3000, () => {
    console.log('Server up and running');
    // console.log(app);
    // console.log('Express server started on port %s at %s', app.address().port, app.address().address);
});


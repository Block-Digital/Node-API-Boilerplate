require('module-alias/register');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require("cookie-parser");
const path = require('path');
const credentials = require('./middleware/credentials');

dotenv.config();

mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true },
() => {
    console.log('connected to DB');
});

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

app.use(credentials);

// Middleware for cookies
app.use(cookieParser());

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// Define routes
require('./routes/all')(app);

app.listen(5000, () => {
    console.log('Server up and running');
    // console.log(app);
    // console.log('Express server started on port %s at %s', app.address().port, app.address().address);
});


const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('auth-token');

    if(!token) return res.status(401).send('Access Denied');

    // try{
    jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded) => {
        if(err) return res.sendStatus(403);
        req._info = decoded._info;
        next();
    });
}
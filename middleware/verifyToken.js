const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).send('Access Denied');

    console.log("Auth Header: ", authHeader);
    const token = authHeader.split(' ')[1];

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
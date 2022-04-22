const express = require("express");
// const dotenv = require('dotenv').config();

module.exports = function(app) {
  app.use(express.json());

  app.use(`${process.env.API_URL}/user`, require('./public/auth'));
  app.use(`${process.env.API_URL}/posts`, require('./public/posts'));

  // Protected Routes
  app.use(`${process.env.PROTECTED_API_URL}`, require('@middleware/verifyToken'));
  app.use(`${process.env.PROTECTED_API_URL}/posts`, require('./private/posts'));
};
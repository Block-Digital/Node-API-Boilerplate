const router          = require('express').Router();
const authController  = require("@controllers/auth");

// Token route
router.post('/token', authController.token);

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

module.exports = router;
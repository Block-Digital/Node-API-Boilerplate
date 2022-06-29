const router          = require('express').Router();
const authController  = require("@controllers/auth");

// Login route
router.get('/all', authController.getAll);

module.exports = router;
const router          = require('express').Router();
const authController  = require("@controllers/auth");

// Login route
router.get('/all', authController.getAll);

router.post('/update/:id', authController.update);

module.exports = router;
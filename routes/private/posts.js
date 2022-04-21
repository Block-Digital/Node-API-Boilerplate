const router    = require('express').Router();
const verify    = require('@middleware/verifyToken');

router.get('/', require("@controllers/posts").get);

module.exports = router;
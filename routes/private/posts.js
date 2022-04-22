const router        = require('express').Router();
const verifyRoles   = require('@middleware/verifyRoles');
const roles         = require('@config/roles');
const posts         = require("@controllers/posts");

router.get('/', verifyRoles(roles.Admin), posts.get);

module.exports = router;
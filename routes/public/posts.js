const router    = require('express').Router();

router.get('/', (req, res) => {

    res.json({
        posts: {
            title: 'My first Post',
            description: "Data you should not access without being logged in"
        }
    })
})

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    const user=req.user;

    res.render('home', {
        title: 'Home Page',
        user
    })
});

module.exports = router;
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/parser');

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

router.post('/register',
    body('username')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long!'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.username == '' || req.body.password == '' || req.body.email == '') {
                throw new Error('All fields are required!');
            }

            if (req.body.password != req.body.repass) {
                throw new Error('Passwords don\'t match!');
            }

            const token = await register(req.body.username, req.body.email, req.body.password);

            res.cookie('token', token);

            res.redirect('/');
        } catch (err) {

            const errors = parseError(err);

            res.render('register', {
                title: "Register Page",
                errors,
                body: {
                    username: req.body.username,
                    email: req.body.email
                }
            })
        }
    });

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
});

router.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);

        res.redirect('/'); 
    } catch (err) {
        const errors = parseError(err);

        res.render('login', {
            title: "Login Page",
            errors,
            body: {
                email: req.body.email
            }
        })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;
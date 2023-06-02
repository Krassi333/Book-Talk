const User = require('../models/User');
const { getAllBooks, createBook } = require('../services/bookServices');
const { errorParser } = require('../util/parser');

const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const books = await getAllBooks();
    res.render('catalog', {
        title: 'Catalog Page',
        books
    })
});

router.get('/create', async (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
});

module.exports = router;
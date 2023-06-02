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

module.exports = router;
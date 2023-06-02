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

router.post('/create', async (req, res) => {

    const data = {
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        bookReview: req.body.bookReview,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        owner: req.user._id
    }
   // console.log(data);

    try {
        await createBook(data);
        res.redirect('/book/catalog');
    } catch (err) {
        const errors = errorParser(err);

        res.render('create', {
            title: 'Create Page',
            errors,
            data
        })
    }
})



module.exports = router;
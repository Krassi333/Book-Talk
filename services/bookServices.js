const Book = require('../models/Book');

async function getAllBooks() {
    return Book.find({}).collation({ locale: 'en', strength: 2 }).lean();
}

module.exports = {
    getAllBooks,
    createBook
}
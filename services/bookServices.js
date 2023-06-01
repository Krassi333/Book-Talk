const Book = require('../models/Book');

async function getAllBooks() {
    return Book.find({}).collation({ locale: 'en', strength: 2 }).lean();
}
async function createBook(data) {
    console.log('data in service '+ data);
    return Book.create(data);
};

module.exports = {
    getAllBooks,
    createBook
}
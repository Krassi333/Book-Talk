const { Schema, model, Types } = require("mongoose")

const urlPattern = /https?:\/\/./i;  
// за валидация на image

const bookSchema = new Schema({
    title: { type: String, required: true, minlength: [4, 'Course name must be at least 4 characters long!'] },
    author: { type: String, required: true, minlength: [5, 'Course name must be at least 5 characters long!'] },
    bookReview: {
        type: String, required: true,
        minlength: [10, 'Description must be at least 10 characters long!']
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => urlPattern.test(value),
            message: 'Invalid URL!'
        }
    },
    genre: { type: String, required: true, minlength: [3, 'Course name must be at least 3 characters long!'] },
    stars: { type: Number, min: 1, max: 5 },
    owner: { type: [Types.ObjectId], ref: 'User' },
    whishList: { type: [Types.ObjectId], ref: 'User', default: [] }

});


const Book = model('Book', bookSchema);

module.exports = Book;
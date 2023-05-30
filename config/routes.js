const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/book', bookController);
}
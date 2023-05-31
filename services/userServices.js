const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const secret = 'erdfcv67gbl';

async function register(username,email, password) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken!');
    }

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is already registered!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });
    
    const token = createSesion(user);
    return token;
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}
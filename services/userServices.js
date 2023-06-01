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

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorect username or password!');
    }

    const passwordCheck = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCheck) {
        throw new Error('Incorect username or password!');
    }

    const token = createSesion(user);
    return token;
}

function createSesion({ _id, username }) {
    const payload = {
        _id,
        username
    }

    const token = jwt.sign(payload, secret);

    return token;
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}
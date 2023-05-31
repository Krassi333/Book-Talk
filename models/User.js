const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: { type: String, required: true, minlength: [4, 'Username must be at least 4 charecters long!'] },
    email: { type: String, required: true, minlength: [10, 'Invalid email!'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;
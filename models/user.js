const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
    googleID: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String,
    money: Number
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
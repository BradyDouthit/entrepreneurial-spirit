const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
    socialIDs: Object,
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
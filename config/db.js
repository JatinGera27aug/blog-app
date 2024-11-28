const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

function connectToDb() {
    mongoose.connect("mongodb+srv://jat78901:jat78901@cluster0.n7q0mv9.mongodb.net/Blog")
    .then(() => console.log('connected to db'))
}
// connectToDb();
module.exports = connectToDb;


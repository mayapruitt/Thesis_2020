// 1. Read in your mongoose library
const mongoose = require('mongoose');
// 2. Get the Schema class from mongoose
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    "list": [String],
    "vector" : [Number],
    "sim"    : String,
    "diff"   : String,
    "choice" : String,
    "choiceReason" : String
    
});

// 4. create a new mongodb model called: "UserData"
const userDatabase = mongoose.model('UserData', userDataSchema)

const dictionaryDataSchema = new Schema({
    "word": String,
});

const dictionaryDatabase = mongoose.model('DictionaryData', dictionaryDataSchema);

exports.userDatabase = userDatabase;
exports.dictionaryDatabase = dictionaryDatabase;

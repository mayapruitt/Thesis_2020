const mongoose = require('mongoose');
const models = require("./models.js");
const queries = require("./queries.js");

var dbConnection;

function connect(mongoURI){
    dbConnection = mongoose.connect(mongoURI, {useNewUrlParser : true});
};


//Connection function
exports.connect = connect;
    
//Connection
exports.dbConnection = dbConnection;

//Models
exports.collections = models;
exports.queries = queries;

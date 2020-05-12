const models = require("./models.js");

function createUser(list, vector){

    const userData = {
	"list"         : list,
	"vector"       : vector,
	"sim"          : "",
	"diff"         : "",
	"choice"       : "",
	"choiceReason" : ""
    };
    
    return new Promise((resolve, reject) => {
	models.userDatabase.create(userData, (err, data) => {
	    if(err){
		reject(err);
	    }
	    resolve(data);
	});
    });
}
exports.createUser = createUser;

function updateUserWithChoice(data){


    return new Promise((resolve, reject) => {
	models.userDatabase.findByIdAndUpdate({_id: data.id},
					      {sim: data.sim,
					       diff: data.diff,
					       choice: data.choice,
					       choiceReason: data.choiceReason}, (err, data) => {
						   if(err){
						       reject(err);
						   }
						   resolve(data);
					       });
    });
						   
    
}
exports.updateUserWithChoice = updateUserWithChoice;

//Checks the dictionary for a word
//Returns 0 if the word is not in the dictionary (length of returned list should be 0 if word can not be found)
function checkDictionaryForWord(word){

    return new Promise((resolve, reject) => {
	models.dictionaryDatabase.find({"word" : word}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    
	    resolve(data.length);
	})
    });			       
    
}
exports.checkDictionaryForWord = checkDictionaryForWord;

//Adds a word to the dictionary collection
function addWordToDict(word){

    return new Promise((resolve, reject) => {
	models.dicionatyDatabase.create({word:arr[i]}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    resolve(data);
	});
    });

}
exports.addWordToDict = addWordToDict

//Returns the length of the dictionary and the words
function getDictWords(){

    return new Promise((resolve, reject) => {
	models.dictionaryDatabase.find({}, (err, data) => {
	    if(err) {
		reject(err);
	    }

	    var map = {};
	    var ret = [];
	    data.forEach((element, index) => {
		map[element.word] = index;
	    });

	    ret.push(data.length);
	    ret.push(map);
	    resolve(ret);
	    
	});

    });
}
exports.getDictWords = getDictWords;

//Returns all of the vectors in the database
function getDBVectors(){

    return new Promise((resolve, reject) => {

	//construct a query
	var query = models.userDatabase.find({}).select("vector");

	//execute a query
	query.exec((err, data) =>{
	    if(err){
		reject(err);
	    }

	    resolve(data);
	});

    });

}
exports.getDBVectors = getDBVectors;

//Returns all users from the database
function getAllUsers(){
    return new Promise((resolve, reject) => {
	models.userDatabase.find({}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    resolve(data);
	});

    });
}
exports.getAllUsers = getAllUsers;

function getAllWords(){
   return new Promise((resolve, reject) => {
	models.dictionaryDatabase.find({}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    resolve(data);
	});

    });
}
exports.getAllWords = getAllWords;


//Get a user document from the user database from the id
function getUserDocumentFromId(id){
    return new Promise((resolve, reject) => {
	models.userDatabase.find({"_id" : id}, (err, data) => {
	    if(err){
		reject(err);
	    }

	    resolve(data);
	});

    });

}
exports.getUserDocumentFromId = getUserDocumentFromId;

//Get a user created list from an id
function getListFromId(id){
    return new Promise((resolve, reject) => {
	models.userDatabase.find({"_id" : id}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    resolve(data)
	});
    });
}
exports.getListFromId = getListFromId;


//Delete all users in the users collection
function deleteAllUsers(){
    return new Promise((resolve, reject) => {
	models.userDatabase.deleteMany({}, (err, data) => {
	if(err){
	    reject(err);
	}
	    console.log("Deleted user data from database!");
	    resolve(data);
	});
    });

}
exports.deleteAllUsers = deleteAllUsers;

//Delete all dictionary words from the dictionary collection
function deleteAllDictionaryWords(){
    return new Promise((resolve, reject) => {
	models.dictionaryDatabase.deleteMany({}, (err, lad) => {
	if(err){
	    reject(err);
	}
	    console.log("Deleted dictionary data from database!");
	    resolve(lad);
	});
    });

}
exports.deleteAllDictionaryWords = deleteAllDictionaryWords;

function delUserWithId(id){
    return new Promise((resolve, reject) => {
	models.userDatabase.deleteOne({"_id" : id}, (err, data) => {
	    if(err){
		reject(err);
	    }
	    console.log(data);
	    resolve(data);
	});
    });
}
exports.deleteUserWithId = delUserWithId;

function delTestData(){
   return new Promise((resolve, reject) => {
       models.userDatabase.find({}, (err, data) => {
	   if(err){
	       reject(err);
	   }
	   data.forEach((datum) => {
	       if(!datum.list){
		   return;
	       }
	       datum.list.forEach((li)=>{
		   if(li == "test" ||
		      li == "a" ||
		      li == "a " ){
		       delUserWithId(datum._id);
		   }
	       });
	   });
	   resolve(data);
       });
   });
}
exports.deleteTestData = delTestData;

const dbInteraction = require("../dbInteraction")

//Adds a word to the dictionary
async function addToDict(arr) {
    //iterates through the given array
    for (let i = 0; i < arr.length; i++) {
        //creates a variable to hold duplicate info

	//Checks the database for an instance of the word
	//if none, add it to the dictionary
	const res = await dbInteraction.queries.checkDictionaryForWord(arr[i]);
	
	//If the word is not in the dictionary, add it
	if(!res){
	    await dbInteraction.collections.dictionaryDatabase.create({word:arr[i]});
	}
    }

    //after the iterations returns the new array of unique elements
}
exports.addToDictionary = addToDict;

var matching = require("./requires.js");

/* Take an existing array and 
returns an array of unique elements */
function makeDict(arr) {
    //creates an empty array
    let newArray = [];
    //iterates through the give array
    for (let i = 0; i < arr.length; i++) {
        //creates a variable to hold duplicate info
        //sets to 0 (false)
        var dupe = 0
            //iterates thorugh the newArray 
        for (let j = 0; j < newArray.length; j++) {
            //if there is a match, set dupe to true
            if (arr[i] == newArray[j]) {
                dupe = 1;
            }
        }
        //if dupe is false, push the element to the newArray
        //makes an array of unique elements (no duplicates)
        if (dupe == 0) {
            newArray.push(arr[i]);
        }
    }

    //after the iterations returns the new array of unique elements
    return newArray;
}
exports.makeDictionary = makeDict;

function addToDict(arr) {
    //iterates through the given array
    for (let i = 0; i < arr.length; i++) {
        //creates a variable to hold duplicate info
        //sets to 0 (false)
        var dupe = 0
            //iterates thorugh the newArray 
        for (let j = 0; j < matching.dict.length; j++) {
            //if there is a match, set dupe to true
            if (arr[i] == matching.dict[j]) {
                dupe = 1;
            }
        }
        //if dupe is false, push the element to the newArray
        //makes an array of unique elements (no duplicates)
        if (dupe == 0) {
            matching.dict.push(arr[i]);
        }
    }

    //after the iterations returns the new array of unique elements
}
exports.addToDictionary = addToDict;
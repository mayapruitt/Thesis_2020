var matching = require("./requires.js")
    //let array = [0, 1, 2, 3, 3, 3];

/* Finds one to one matches within an array
returns the matched element */
function findMatchWI(arr) {
    //iterates through the array, element by element
    for (let i = 0; i < arr.length - 1; i++) {
        //iterates through the same array after, one index ahead
        for (let j = (i + 1); j < arr.length; j++) {
            //if the element of index i is equal to the subsequent
            //index j element than it is a match, return that element
            if (arr[i] == arr[j]) {
                return arr[i];
            }
        }
    }
    //returns false if there are no matches 
    return false;
}
exports.findMatchWithin = findMatchWI;

/* 
Takes in an list (array of uses/sentence string)
Splits it into one array of all words as their own elements */
function makeStrArr(li) {
    //creates a new empty array 
    var newli = [];
    //iterates through the passed-in list (aray of sentence strings)
    for (let i = 0; i < li.length; i++) {
        //creates a new array of arrays where each word is separated
        //ex: [ ['drink', 'water'], ['musical', 'instrument'] ]
        var x = li[i].split(" ");
        //iterates through the x array and pushes each individual 
        //word to the new array
        for (let j = 0; j < x.length; j++) {
            newli.push(x[j]);
        }
    }
    //returns the new array
    return newli;
}
exports.makeStringArray = makeStrArr;

/*
Converts a dictionary (list of unique words) to numbers
these numbers eventually represent the indicies of ones in a 
vector matrix*/
function wordsToDictInd(li) {
    //creates an empty vectors array 
    var newArr = []
        //iterates through the list array
    for (let i = 0; i < li.length; i++) {
        //iterations through the dictionary array
        for (let k = 0; k < matching.dict.length; k++) {
            //if the word in the word list array matches a word in the dictionary 
            //pushes the index of the matched word in the dictionary to the new array
            if (li[i] == matching.dict[k]) {
                newArr.push(k);
            }
        }
        //pushes the newArray to the vectos array
    }

    return newArr;
}

exports.wordsToDictIndex = wordsToDictInd;
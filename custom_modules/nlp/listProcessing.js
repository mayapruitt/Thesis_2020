const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
const StopWords = require('stopword');
var stemmer = require('stemmer'); //stems words

var dbInteraction = require("../dbInteraction");

function preprocessString(str){
    //console.log("Processing string: " + str);
    //Preprocessing the data
    var data = aposToLexForm(str); //remove contractions
    data = data.toLowerCase(); //convert to lowercase
    data = data.replace(/[^a-zA-Z\s]+/g, ''); //regex to replace none alphabetic chars

    //Tokenize
    const { WordTokenizer } = natural;
    const token  = new WordTokenizer().tokenize(data);

    //remove stop words
    formatedData = StopWords.removeStopwords(token);

    formatedData.forEach((word, index) => {
	token[index] = spellCorrector.correct(word);//correct the spelling of a word
	token[index] = stemmer(word);//remove gerunds
    });

    //Return a formatted string
    return formatedData.join(" ");
}
exports.preprocessString = preprocessString


/* Finds one to one matches within an array
returns the matched element */
function findMatchWI(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = (i + 1); j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                return arr[i];
            }
        }
    }
    return false;
}
exports.findMatchWithin = findMatchWI;

/* 
Takes in an list (array of uses/sentence string)
Splits it into one array of all words as their own elements */
function makeStrArr(li) {
    var newli = [];

    for (let i = 0; i < li.length; i++) {
        var x = li[i].split(" ");
        for (let j = 0; j < x.length; j++) {
            newli.push(x[j]);
        }
    }

    return newli;
}
exports.makeStringArray = makeStrArr;


/*
Converts a dictionary (list of unique words) to numbers
these numbers eventually represent the indicies of ones in a 
vector matrix*/
async function wordsToDictInd(userList) {
    var newArr = []

    //dictInfo returns the length of the dictionary and the list of words
    //0: dictionary length, 1: words
    var dictInfo = await dbInteraction.queries.getDictWords();
    var dictMap = dictInfo[1];
    for (let i = 0; i < userList.length; i++) {
	newArr.push(dictMap[userList[i]]);
    }

    return [dictInfo[0], newArr];
}

exports.wordsToDictIndex = wordsToDictInd;

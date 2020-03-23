//clustering algorithm
var matching = require("./requires.js");


function simUsers(lists) {
    for (let i = 0; i < lists.length; i++) {
        var [sim, diff] = pipeL(lists[i]);

        // console.log("ANALYSIS FOR LIST " + i + ":")
        // console.log("LIST TEXT: ")
        // console.log(lists[i]);
        // console.log("\n***\n");
        // console.log("MOST SIMILAR WAS LIST " + sim + ":")
        // console.log(lists[sim]);
        // console.log("\n-------\n");
        // console.log("MOST DIFFERENT WAS LIST " + diff + ":")
        // console.log(lists[diff]);
        // console.log("\n\n\n\n")

    }
};
exports.simulateUsers = simUsers;


function pipeL(li) {

    //Format the list as an array of strings
    var strArr = matching.listProcessing.makeStringArray(li);

    /* FIND NEW WORDS AND ADD NEW DIMENSIONS */

    //Add the new words to the dictionary
    matching.dictionary.addToDictionary(strArr);
    //Add new dimensions to the vectors in the matrix
    matching.vectors.extendVectors();

    /* CONVERT LIST INTO VECTOR */
    //an array of numbers representing dictionary index
    var dicWords = matching.listProcessing.wordsToDictIndex(strArr);
    //vector array of zeros (length of dictionary) 
    var vec = matching.vectors.initVector(matching.dict.length);
    //vector of zeros and ones, ones at the indices of dictionary words
    matching.vectors.populateVector(dicWords, vec);

    /* COMPARE LIST TO OTHERS */

    var choices = matching.vectors.matchVectors(vec);
    //console.log(choices);
    //most similar list is choices[0]
    //most diff list is choices[1]

    /* PUSH NEW VECTOR TO MATRIX */
    matching.matrix.push(vec);

    /* RETURN MOST SIMILAR AND MOST DIFFERENT */
    return [choices[0], choices[1]];
}
exports.pipeline = pipeL;
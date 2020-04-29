//clustering algorithm
var listProcessing = require("./listProcessing.js");
var dictionaryOps = require("./dictionary.js");
var vectorOps = require("./vector.js");
var classification = require("./classification");
var dbInteraction = require("../dbInteraction");


async function simUsers(lists) {
    for (let i = 0; i < lists.length; i++) {

        var ret = await uPipeL(lists[i]);
	console.log(ret[0].vector);
	var newDocument = await dbInteraction.queries.createUser(lists[i], ret[0].vector);	
	console.log("finished user " + i);
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


async function uPipeL(li) {

    var processingList = [];
    li.forEach((item, index) => {
	processingList.push(listProcessing.preprocessString(item));
    });

    //Format the list as an array of strings
    var strArr = listProcessing.makeStringArray(processingList);

    /* FIND NEW WORDS AND ADD NEW DIMENSIONS */

    //Add the new words to the dictionary 
   await dictionaryOps.addToDictionary(strArr);

    /* CONVERT LIST INTO VECTOR */
    //returns the current length of the dictionary as well as the converted string
    //0: current length of dictionary, 1: translation
    var dicWords = await listProcessing.wordsToDictIndex(strArr);

    //INITIALIZE AND POPULATE VECTOR
    var vec = vectorOps.initVector(dicWords[0]);
    vectorOps.populateVector(dicWords[1], vec);

    /* COMPARE LIST TO OTHERS */
    //0: similar list, 1: different list
    var [sim, diff] = await vectorOps.matchVectors(vec);
    var newDocument = await dbInteraction.queries.createUser(li, vec);
    
    /* RETURN MOST SIMILAR AND MOST DIFFERENT */
    return [newDocument, sim, diff];
}

exports.userListPipeline = uPipeL;


function classPipeline(text){

    if(!classification.initialized){
	classification.initializeNet();
	classification.initialized = 1;
    }

    console.log(`PARSING THE RESULTS OF [${text}]!\n`);
    let results = classification.classifyText(classification.makeVec(text));
    let breakdown = classification.textBreakDown(text);

    const stats = {
	results: results,
	breakdown: breakdown
    }

    console.log(stats);
    return stats;
}
exports.classificationPipeline = classPipeline;

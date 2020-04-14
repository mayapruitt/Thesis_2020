var linearMath = require("./linearMath.js")
var dbInteraction = require("../dbInteraction");
    /* Takes the number aray (unique words as its own numnber) 
    and the unique words array to create an array of arrays 
    (matrix) with every element intialized as zeros. */

/* 
Takes in the length of an array and sets every element of the array to 0
*/
function initVec(len) {
    var arr = new Array(len)

    for (let i = 0; i < len; i++) {
        arr[i] = 0;
    }

    return arr;
}

exports.initVector = initVec;

/*
Takes a numbers array (array of idicies of unique words) 
and a vectors array (array of zeros) and replaces zeros with ones 
at the appropriate indicies.
*/
function popVec(numArr, vecsArr) {

    for (let i = 0; i < numArr.length; i++) {
        vecsArr[numArr[i]] += 1;
    }

}
exports.populateVector = popVec;



/*
Matches a vector to all the vectors of the matrix
Returns the most similar and most different vectors from the matrix */
async function matchVecs(vec) {
    var min = 90; //stores the smallest degree seen
    var max = 0; //stores the largest degree seen

    var ret = new Array(2);
    let num;
    var dbVecs = await dbInteraction.queries.getDBVectors();

    //iterate through the matrix array
    for (let i = 0; i < dbVecs.length; ++i) {
        //compare vector to every vector in the matrix array
	
	//ensure that the vectors are the same length (new words have been added since the dbVec was inserted
	if(dbVecs[i].vector.length < vec.length){
	    dbVecs[i].vector.concat(initVec(vec.length - dbVecs[i].vector.length));
	}

        num = linearMath.compareVecs(vec, dbVecs[i].vector);

        //If degree is smaller than any we've seen so far
        //This list is the most similar so far
        if (num < min) {
            min = num; //record the new min
            ret[0] = i; //record the associated vector
        }
        //If degree is larger than any we've seen so far
        //This list is the most different so far
        if (num > max) {
            max = num;
            ret[1] = i;
        }
    }

    //Logic for if there aren't enough vectors in the database
    //(just pick a random one)
    if (min == 90) {
        do {
            ret[0] = ((Math.random() * 100) % (dbVecs.length - 1)) | 0;
        } while (ret[0] == ret[1] && dbVecs.length > 3);
    }
    if (max == 0) {
        do {
            ret[1] = ((Math.random() * 100) % (dbVecs.length - 1)) | 0;
        } while (ret[1] == ret[0] && dbVecs.length > 3);
    }

    
    var retObjects = new Array(2);
    try{
	retObjects[0] = await dbInteraction.queries.getUserDocumentFromId(dbVecs[ret[0]]._id);
	retObjects[1] = await dbInteraction.queries.getUserDocumentFromId(dbVecs[ret[1]]._id);
    }catch(e){
	return [-1, -1];
    }
    
    //Return the matrix indicies of the most similar and most different vectors
    return [retObjects[0], retObjects[1]];
}
exports.matchVectors = matchVecs;

var matching = require("./requires.js")
    /* Takes the number aray (unique words as its own numnber) 
    and the unique words array to create an array of arrays 
    (matrix) with every element intialized as zeros. */

/* 
Takes in the length of an array and sets every element of the array to 0
*/
function initVec(len) {
    //creates new array
    var arr = new Array(len)
        //iterates through the array
    for (let i = 0; i < len; i++) {
        //sets the element at every index to 0
        arr[i] = 0;
    }
    //return the array of zeros
    return arr;
}

exports.initVector = initVec;

/*
Takes a numbers array (array of idicies of unique words) 
and a vectors array (array of zeros) and replaces zeros with ones 
at the appropriate indicies.
*/
function popVec(numArr, vecsArr) {
    //iterates through numbers array
    for (let i = 0; i < numArr.length; i++) {
        //set zeros at the indexes listed in numArr to 1
        vecsArr[numArr[i]] += 1;

    }
}
exports.populateVector = popVec;

//if vector length doesn't match dictionary, extend it with zeros 
function extendVec() {
    //iterates through the matrix array
    for (let i = 0; i < matching.matrix.length; i++) {
        //if the matrix array length is less than the dictionary array length
        if (matching.matrix[i].length < matching.dict.length) {
            //take the dictionary length minus the elements at index i of matrix length
            //initilize the elements to zeros
            //add the whole section to the matrix array
            //set matrix[i] to this new array
            matching.matrix[i] = matching.matrix[i].concat(initVec(matching.dict.length - matching.matrix[i].length));
        }
    }
}
exports.extendVectors = extendVec;

/*
Matches a vector to all the vectors of the matrix
Returns the most similar and most different vectors from the matrix */
function matchVecs(vec) {
    var min = 90; //stores the smallest degree seen
    var max = 0; //stores the largest degree seen
    //set ret to a new array of length 2
    var ret = new Array(2);
    let num;

    //iterate through the matrix array
    for (let i = 0; i < matching.matrix.length; ++i) {
        //compare vector to every vector in the matrix array
        num = matching.linearMath.compareVecs(vec, matching.matrix[i]);
        // console.log(num);
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
    if (min == 90) {
        do {
            ret[0] = ((Math.random() * 100) % (matching.listData.lists.length - 1)) | 0;
        } while (ret[0] == ret[1] && matching.matrix.length > 3);
    }
    if (max == 0) {
        do {
            ret[1] = ((Math.random() * 100) % (matching.listData.lists.length - 1)) | 0;
        } while (ret[1] == ret[0] && matching.matrix.length > 3);
    }

    //Return the matrix indicies of the most similar and most different vectors
    return [matching.listData.lists[ret[0]], matching.listData.lists[ret[1]]];
}
exports.matchVectors = matchVecs;
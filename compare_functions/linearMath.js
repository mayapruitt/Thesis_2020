var matching = require("./requires.js");
/*
 *
 * MATH FUNCTIONS
 * 
 */

//determines the overlap of two vectors
function dotProd(x, y) {
    //sets a sum variable to 0
    var sum = 0;
    var minLen = x.length < y.length ? x.length : y.length;

    //iterates through the length of vector x
    for (let i = 0; i < minLen; i++) {
        //set sum to sum + (element x at index i and element y at index i)
        sum += (x[i] * y[i]);
    }
    //returns the dot product
    return sum;
}
exports.dotProduct = dotProd;


//calculates the magnitude of the vector 
function mag(vec) {
    //creates a sum variable, sets it to 0
    var sum = 0
        //iterates through the length of the vector array
    for (let i = 0; i < vec.length; ++i) {
        //adds sum to the square of the element at index i
        sum += (vec[i] * vec[i]);
    }
    //returns the square root of the sum 
    return Math.sqrt(sum)
}
exports.magnitude = mag;

/* 
If two vectors match exactly the degree = 0, vectors most dissimilar
measure to 90
*/

//calculates the cosine similarity of two vectors
function cosineSim(x, y) {
    //sets dot to the dotproduct of two vectors
    var dot = dotProd(x, y);

    //sets mag1 to the magnitude of vector x
    var mag1 = mag(x);
    //sets mag2 to the magnitude of vector y
    var mag2 = mag(y);
    //sets cS (cosine similarity) to the dot product
    //divided by the product of mag1 & mag2
    var cS = dot / (mag1 * mag2);

    //Check for perfect match
    //Prevents returning NaN
    var ret = Math.acos(cS);
    if (isNaN(ret)) {
        return 0;
    }
    //returns the inverse cosine of cS
    return ret;
}
exports.cosSim = cosineSim;

//converts radians to degree
function rtd(num) {
    return num * (180 / Math.PI)
}
exports.radToDeg = rtd;

//converts degrees to radians
function dtr(num) {
    return num * (Math.PI / 180)
}
exports.degToRad = dtr;

function compVecs(vec1, vec2) {
    return rtd(cosineSim(vec1, vec2));
}
exports.compareVecs = compVecs;
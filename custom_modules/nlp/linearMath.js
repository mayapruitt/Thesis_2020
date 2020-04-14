/*
 *
 * MATH FUNCTIONS
 * 
 */

//determines the overlap of two vectors
function dotProd(x, y) {
    var sum = 0;
    var minLen = x.length < y.length ? x.length : y.length;

    for (let i = 0; i < minLen; i++) {
        sum += (x[i] * y[i]);
    }
    return sum;
}
exports.dotProduct = dotProd;


//calculates the magnitude of the vector 
function mag(vec) {
    var sum = 0

    for (let i = 0; i < vec.length; ++i) {
        sum += (vec[i] * vec[i]);
    }

    return Math.sqrt(sum)
}
exports.magnitude = mag;

/* 
If two vectors match exactly the degree = 0, vectors most dissimilar
measure to 90
*/

//calculates the cosine similarity of two vectors
function cosineSim(x, y) {
    var dot = dotProd(x, y);

    var mag1 = mag(x);
    var mag2 = mag(y);
    var cS = dot / (mag1 * mag2);

    //Check for perfect match
    //Prevents returning NaN
    var ret = Math.acos(cS);
    if (isNaN(ret)) {
        return 0;
    }

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

function compVecs(vec1, vec2){
    return rtd(cosineSim(vec1, vec2));
}
exports.compareVecs = compVecs;

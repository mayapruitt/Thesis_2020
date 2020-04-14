# NLP Functions

## Other functions

### `function findMatchWithin(arr)`

* input: array of items
* output: boolean
* function: returns the duplicate element in the array and false if there is none


## Dictionary functions

### `function makeStringArray(li)`

* input: array of strings
* output: array of strings
* function: Takes in a list of sentences and puts all the words of those sentences into an array
* TODO: remove non alphanumeric characters, remove common words


### `function makeDictionary(arr)`

* input: array of strings
* output: array of strings
* function: Takes in a list of strings and returns a new array of all the unique words in that array. This creates the dictionary by mapping a string to a number. The number is the index of the word in the array

### `function wordToDictIndex(li, dict)`

* input: li = array of strings, dict = dictionary
* output: array of integers
* function: Takes in a list of sentences and the dictionary and converts the words in each setence into an array of their positions in the dictionary

### `function initVector(dictLen)`

* input: sentences array length , dictionary length
* output: array of vectors
* function: Takes in the length of the list of sentences, and the length of the dictionary, and creates an initialized array of vectors with rows equal to the number of sentences and columns equal to the number of items in the dictionary


### `function populateVector(numArr, vecsArr)`

* input: array of arrays of integers, initialized vectors
* output: NONE
* function: Populates the vector matrix based on the words in the sentence. Uses the index positions created in `makeOnesPosition` and populates the matrix created in `initVectors`.

## Math functions
`function dotProduct(x, y)`
`function magnitude(vec)`
`function cosSim(x, y)`
`function radToDeg(num)`
`function degToRad(num)`

## List Comparison functions
`function makeDictionaryFromLists(list1, list2)`
`function processLists(list2, list2)`
`function compareLists(list1, list2)`
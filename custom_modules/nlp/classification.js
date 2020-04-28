var listProcessing = require("./listProcessing.js");
var dictionaryOps = require("./dictionary.js");
var vectorOps = require("./vector.js");
var brain = require("brain.js")
var fs = require('fs')

function csvColsToJSON(csvFile){

    var f = fs.readFileSync(csvFile, 'utf8');
    f = f.split("\n");
    headers = f[0].trim().split(",");

    //format the JSON object
    var jsonObj;
    jsonObj = '{ \n"classes" : [ \n';
    headers.forEach((item) => {
	item = item.trim();
	jsonObj += `{"class" : "${item}",\n"phrases" : [] },\n`;
    });
    jsonObj = jsonObj.substr(0, jsonObj.length - 2);
    jsonObj += "\n] \n}";

    //Convert from string to a JSON object
    jsonObj = JSON.parse(jsonObj);

    
    f.forEach((item, num) => {
	if(num > 0){
	    item.trim().split(",").forEach((p, ind) => {
		//p = listProcessing.preprocessString(p);
		if(p != ""){
		    //p = listProcessing.preprocessString(p);
		    jsonObj.classes[ind].phrases.push(p);
		}
	    });
	    
	}
    });

    jsonObj.classes.forEach((category) => {
	category.phrases.forEach((phrase) => {
	    fs.appendFileSync("data.csv", `${category.class},${phrase},\n`);
	});
    });

	      
    return jsonObj;

}


function wordsToDict(data){
    let dict = []
    data.classes.forEach((category) => {
	category.phrases.forEach((phrase) => {
	    phrase.split(" ").forEach((word) =>{		
		if(!dict.includes(word) && word != ""){
		    dict.push(word);
		}
	    });
	});
    });
    return dict;
} 

function makeVec(phrase, dict){
    let t = phrase.split(" ");
    return dict.map(entry => t.includes(entry) ? 1 : 0);

}
function formatForTraining(data, dict){

    let tData = [];
    data.classes.forEach((category, ind) => {
	category.phrases.forEach((phrase) => {
	    let vec = makeVec(phrase, dict);
	    tData.push({input: vec, output: JSON.parse(`{ "${category.class}" : 1 }`)});
	});

    });
    return tData;

}



console.log("Parsing raw data!");
let rawData = csvColsToJSON("./assets/datasets/keyword_classification.csv");

console.log("Creating dictionary!");
let dict = wordsToDict(rawData);

console.log("Formatting for training!");
let tData = formatForTraining(rawData, dict);


const net = new brain.NeuralNetwork();

console.log("Training the network!");
net.train(tData, {errorThresh: 0.014, log: true });

console.log("Processing [" + process.argv[2] + "]");

let testStr = process.argv[2].length > 0 ? listProcessing.preprocessString(process.argv[2]) : "This is very aesthetic";
console.log(net.run(makeVec(testStr, dict)));

var listProcessing = require("./listProcessing.js");
var dictionaryOps = require("./dictionary.js");
var vectorOps = require("./vector.js");
var brain = require("brain.js")
var fs = require('fs')

const net = new brain.NeuralNetwork();
let dict;
let map = {};
let color  = {
    person: 'purple',
    process: 'blue',
    product: 'red',
    press: 'green'
};
let jsonObj;
function csvColsToJSON(csvFile){

    var f = fs.readFileSync(csvFile, 'utf8');
    f = f.split("\n");
    headers = f[0].trim().split(",");

    //format the JSON object
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
		    p = p.trim();
		    jsonObj.classes[ind].phrases.push(p);
		    map[`${p}`] = jsonObj.classes[ind].class;
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

function mkVec(phrase){
    let t = phrase.split(" ");
    return dict.map(entry => t.includes(entry) ? 1 : 0);

}
exports.makeVec = mkVec;


function formatForTraining(data, dict){

    let tData = [];
    data.classes.forEach((category, ind) => {
	category.phrases.forEach((phrase) => {
	    let vec = mkVec(phrase, dict);
	    tData.push({input: vec, output: JSON.parse(`{ "${category.class}" : 1 }`)});
	});

    });
    return tData;

}

function initNet(){
    let rawData = csvColsToJSON("./assets/datasets/keyword_classification.csv");

    console.log("Creating dictionary!");
    dict = wordsToDict(rawData);

    console.log("Formatting for training!");
    let tData = formatForTraining(rawData, dict);

    console.log("Training the network!");
    net.train(tData, {errorThresh: 0.014, log: true });
}
exports.initializeNet = initNet;

exports.initialized = 0;

function classifyTxt(vec){
    return net.run(vec, dict);
}
exports.classifyText = classifyTxt

function txtBreakDown(text){

    let str = text.slice(0, text.length);
    
    let classes = jsonObj.classes;
    let c;
    classes.forEach((classEl, index) => {
	switch(index){
	case 0:
	    c = "blue";
	    break;
	case 1:
	    c = "green";
	    break;
	case 2:
	    c = "red";
	    break;
	case 3:
	    c = "purple";
	    break;
	default:
	    break;
	}
	classEl.phrases.sort((a,b) => {
	    return b.length - a.length
	});
	    
	classEl.phrases.forEach((element) => {
	    if(text.includes(` ${element}`)){
		console.log("EE" + element);
		text = text.replace(element, `<span style="color:${color[classEl.class]}">${element}</span>`);
		console.log(text);
	    }
	});
    });
    

    return text;

}

exports.textBreakDown = txtBreakDown;

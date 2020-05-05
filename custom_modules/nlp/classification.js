var formatting = require("./formatting.js");
var listProcessing = require("./listProcessing.js");
var dictionaryOps = require("./dictionary.js");
var vectorOps = require("./vector.js");
var brain = require("brain.js")
var fs = require('fs')


const net = new brain.NeuralNetwork();
exports.net = net;

let dict;
let map = {};

let color  = {
    person: 'purple',
    process: 'blue',
    product: 'red',
    press: 'green'
};
let jsonObj;

function wordsToDict(data){
    let dict = []
    data.phrases.forEach((phrase) => {
	phrase.phrase.split(" ").forEach((word) => {
	    if(!dict.includes(word) && word != ""){
		dict.push(word);
	    }
	});
    });
    return dict;
} 

function mkVec(phrase){
    let t = phrase.split(" ");
    return dict.map(entry => t.includes(entry) ? 1 : 0);

}
exports.makeVec = mkVec;


//Format the data for training
function formatForTraining(data, dict){

    let tData = [];
    data.phrases.forEach((phrase, ind) => {
	let vec = mkVec(phrase.phrase, dict);
	tData.push({input: vec, output: JSON.parse(`{ "${phrase.class}" : 1 }`)});
    });
    return tData;
}

//Initialize the NN
function initNet(dataFile, dataDir){
    let rawData = formatting.tsvToJSON(dataFile, dataDir);
    jsonObj = rawData;
    console.log("Creating dictionary!");
    dict = wordsToDict(rawData);

    console.log("Formatting for training!");
    let tData = formatForTraining(rawData, dict);

    console.log("Training the network!");
    net.train(tData, {log: true });
    
}
exports.initializeNet = initNet;
exports.initialized = 0;

//Use the NN to classify the text
function classifyTxt(vec){
    return net.run(vec, dict);
}
exports.classifyText = classifyTxt

//Parse the text and identify keywords
function txtBreakDown(text){

    let str = text.slice(0, text.length);
    str = str.toLowerCase();
    text = str;
    console.log(str);
    let phrases = jsonObj.phrases;

    //Cycle through all phrases
    phrases.forEach((phrase, index) => {
	phrase.infoIt = 0;

	//See if the phrase is contained in the text
	if(str.match(`(\\W|^)${phrase.phrase}(\\W|$)`)){
	    let found = [];
	    console.log('surely!');
	    //Find all offets of the matchin in the text
	    text.replace(new RegExp(phrase.phrase, 'g'), (match, index) => {
		found.push(index);
	    });

	    //Replace all matches with the augmented text
	    found.reverse().forEach((index) => {
		text = text.substr(0, index) + `<div class="phrase"><span style="color:${color[phrase.class]}"><span class="phrase-info">${phrase.info[phrase.infoIt++]}</span>${str.substr(index, phrase.phrase.length)}</span></div>` + text.substr(index + phrase.phrase.length);
		phrase.infoIt = phrase.infoIt >= phrase.info.length ? 0 : phrase.infoIt;
	    });
	}
    });
    
    return text;

}
exports.textBreakDown = txtBreakDown;

function netVis(vec){
    return brain.utilities.toSVG(net, {height: "1500", width: "1200"});
}
exports.netVisualization = netVis;


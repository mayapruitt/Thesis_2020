const listProcessing = require("./listProcessing.js");
const fs = require('fs');

function tsvToJson(tsvFile, dataDir){

    let f = fs.readFileSync(tsvFile, 'utf8');
    console.log("got it!");
    let rows = f.split("\n").slice(1);
    let jsonObj = '{ \n"phrases" : [\n';
    rows.forEach((row) => {

	let col = row.split("\t");
	let jsonStr = `{\n"class" : "${col[0].trim()}",\n"phrase" : "${col[1].trim()}",\n`;
	jsonStr += '"infoIt" : 0,\n';
	jsonStr += '"info" : [\n';

	//Add the info to the JSON object
	col.slice(2).forEach((info) => {
	    info = info.trim();
	    info = info.replace(/\"/g, '\\\"');//Replace quotations with \"
	    jsonStr += `"${info.trim()}",\n`;
	});
	jsonStr = jsonStr.substr(0, jsonStr.length - 2);
	jsonStr += ']\n}';

	jsonObj += `${jsonStr},\n`;
    });
    jsonObj = jsonObj.substr(0, jsonObj.length - 2);
    jsonObj += ']\n}';
    let fileName = tsvFile.split("/");
    fileName = fileName[fileName.length - 1].split(".")[0];
    console.log(fileName);
    fs.writeFileSync(`${dataDir}/${fileName}.json`, jsonObj);
    jsonObj = JSON.parse(jsonObj);
    jsonObj.phrases.sort((a,b) => {
	return b.phrase.length - a.phrase.length;
    });
    return jsonObj;

}
exports.tsvToJSON = tsvToJson;

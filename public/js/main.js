//const apiBase = "127.0.0.1:3000/";

let display;
let listInput;
var sessionID;

document.addEventListener("DOMContentLoaded", DOMLoaded);

function DOMLoaded(event) {


    console.log("DOM LOADED!\n");
    display = document.getElementById("participantList");
    listInput = document.getElementById("listInput");

    //Add event listeners to buttons
    document.getElementById("getParts").addEventListener("click", getParticipants);
    document.getElementById("makeNewPart").addEventListener("click", makeNewParticipant);
    //document.getElementById("changePartID").addEventListener("click", changeParticipantID);
    document.getElementById("deletePart").addEventListener("click", deleteParticipant);

    //Initialize textboxes
    // document.getElementById("changeFrom").value = "";
    // document.getElementById("changeTo").value = "";

    // document.getElementById("deleteID").value = "";


}


//Get the participants from the backend
async function getParticipants(event) {
    //fetching the localhost:3000/api url, but can write api because everything in hosted in express
    try {
        let response = await fetch("/api/v1/database", { method: 'GET' });
        response = await response.json();
        console.log(response);
        displayJSON(response);
    } catch (error) {
        console.error(error);
    }
}


//Make a new participant
async function makeNewParticipant(event) {
    try {
        const newData = {
            list: listInput.value.split("\n")
        };
        const options = {
            method: 'POST',
            //tells the server how the data is being sent over
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        };
        console.log(options.body)
        let response = await fetch("/api/v1/database", options);
        response = await response.json();
        //displayJSON(response);
        sessionID = response._id;
        listInput.value = "";
        console.log(sessionID);
    } catch (error) {
        console.error(error);
    }
}


//Delete a participant
async function deleteParticipant(event) {
    let response = await fetch(`/api/v1/database/${sessionID}`, { method: 'DELETE' });
    response = await response.json();
    console.log(response.data);
}


function displayJSON(response) {

    clearElements();

    //If the response contains an error, print it instead
    if (response.error) {
        showElements(response);
        return;
    }

    //Display each participant
    response.forEach(showElements);
}


//Clears the elements of the JSON
function clearElements() {

    while (display.hasChildNodes()) {
        display.removeChild(display.lastChild);
    }

}

//Show the JSON elements
function showElements(item) {

    let $p = document.createElement("p");
    $p.innerHTML = JSON.stringify(item.list);
    display.appendChild($p);
}
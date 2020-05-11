let listInput;
var sessionIDs;
var choice;
document.addEventListener("DOMContentLoaded", DOMLoaded);

function DOMLoaded(event) {

    console.log("DOM LOADED!\n");
    userInput = document.getElementById("listInput");

    //Add event listeners to buttons
    document.getElementById("makeNewPart").addEventListener("click", makeNewParticipant);

    userInput.value = "";

}


//Make a new participant
async function makeNewParticipant(event) {
    try {
        var divArea = document.querySelector("#userListInput");
        const newData = {
            list: userInput.value.split("\n")
        };
        var options = {
            method: 'POST',
            //tells the server how the data is being sent over
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        };
        //Check for empty input
        if (document.querySelector("#listInput").value == "") {
            console.log("Empty list!");
            return;
        }
        userInput.value = "";
        //Ensure user cannot resubmit list
        document.querySelector("#createPage").removeChild(divArea);

        //Provide message that list has been sent
        var listSubmitNotify = document.createElement("P");
        listSubmitNotify.id = "listSubmitNotify";
        listSubmitNotify.className = "statusMessage";
        listSubmitNotify.innerHTML = "List sent!";
        //have list sent first then next question appear with no message about it
        var listComparisonArea = document.querySelector("#listComparisonArea");
        listComparisonArea.appendChild(listSubmitNotify);

        //Get the IDs of the most similar and different lists
        let res = await fetch("/api/parselist", options);
        let response = await res.json();

        var userID = JSON.parse(response.userObj)._id;
        var simID = JSON.parse(response.sim)[0]._id;
        var diffID = JSON.parse(response.diff)[0]._id;
        sessionIDs = [userID, simID, diffID];
        listComparisonArea.removeChild(listSubmitNotify);
        listComparison(response);


    } catch (error) {
        console.error(error);
    }
}

function listComparison(resp) {

    //Define variables for the list comparison area
    var simList, diffList, userObjList;
    var simButt, diffButt, userShow;
    var divArea = document.querySelector("#listComparisonArea");
    var evalInstruc = document.querySelector("#evalInstruction");
    var instructionMess = document.createElement("P");

    //Provide instructions to the user
    instructionMess.id = "listInstructionMess";
    instructionMess.className = "instructions";
    instructionMess.innerHTML = "Which of the following lists do you find more creative?";
    evalInstruc.appendChild(instructionMess);

    //Define additional variables for easy list population
    var listsContainer = document.querySelector("#lists-container");
    var yourListArea = document.querySelector("#yourListArea");
    var simListArea = document.querySelector("#simListArea");
    var diffListArea = document.querySelector("#diffListArea");

    //Set up the user's list
    var yourList = document.createElement("BUTTON");
    yourList.classList = "list debug";

    var yourListTitle = document.createElement("P");
    yourListTitle.innerHTML = "Your list";
    yourListTitle.id = "yourListTitle";

    //Set up the similar list
    simList = document.createElement("P");
    simList.className = "list";
    simButt = document.createElement("BUTTON");
    simButt.id = "simButt";
    simButt.innerHTML = "<span>A</span>";
    simButt.className = "button";
    simButt.addEventListener("click", choseSim);

    //Set up the different list
    diffList = document.createElement("P");
    diffList.className = "list";
    diffButt = document.createElement("BUTTON");
    diffButt.id = "diffButt";
    diffButt.innerHTML = "<span>B</span>";
    diffButt.className = "button";
    diffButt.addEventListener("click", choseDiff);


    //Extract the respective lists from the JSON object
    var parsedDiffList = JSON.parse(resp.diff)[0].list;
    var parsedSimList = JSON.parse(resp.sim)[0].list;
    var userObjList = JSON.parse(resp.userObj).list;

    //Display the lists in the appropriate places
    userObjList.forEach((element, index) => {
        yourList.innerHTML += `${element}<br>`;
    });

    parsedSimList.forEach((element, index) => {
        simList.innerHTML += `${element}<br>`;
    });

    parsedDiffList.forEach((element, index) => {
        diffList.innerHTML += `${element}<br>`;
    });

    //Attach the created elements to the appropriate divs
    yourListArea.appendChild(yourList);
    yourListArea.appendChild(yourListTitle);
    simListArea.appendChild(simList);
    simListArea.appendChild(simButt);
    diffListArea.appendChild(diffList);
    diffListArea.appendChild(diffButt);

    listsContainer.appendChild(yourListArea);
    listsContainer.appendChild(simListArea);
    listsContainer.appendChild(diffListArea);


}

function choseSim() {

    //Remove the buttons from the list selection area
    let listArea = document.querySelector("#simListArea");
    listArea.removeChild(listArea.querySelector("#simButt"));
    document.querySelector("#diffListArea").removeChild(document.querySelector("#diffButt"));

    //Indicate selection status
    var selected = document.createElement("P");
    selected.id = "selected";
    selected.innerHTML = "SELECTED";
    selected.style.color = "green";
    listArea.appendChild(selected);
    reasonDisplay(0);
}

function choseDiff() {

    //Remove the buttons from the list selection area
    let listArea = document.querySelector("#diffListArea");
    listArea.removeChild(listArea.querySelector("#diffButt"));
    document.querySelector("#simListArea").removeChild(document.querySelector("#simButt"));

    //Indicate selection status
    var selected = document.createElement("P");
    selected.id = "selected";
    selected.innerHTML = "SELECTED";
    listArea.appendChild(selected);
    reasonDisplay(1);
}

function reasonDisplay(type) {

    choice = type;
    var divArea = document.querySelector("#listChoiceReasonArea");
    var instructionMess = document.createElement("P");
    instructionMess.id = "choiceInstructionMess";
    instructionMess.className = "instructions";
    instructionMess.innerHTML = "In two minutes, write as much as you can – <br>Why did you choose that list?";
    var incentiveMess = document.createElement("P");
    incentiveMess.id = "incentiveMess";
    incentiveMess.innerHTML = "(The more detail you provide here, the better your analysis will be!)"
    divArea.appendChild(instructionMess);
    divArea.appendChild(incentiveMess);

    var textBox = document.createElement("TEXTAREA");
    textBox.id = "choiceTextArea";
    divArea.appendChild(textBox);

    var submitButtonContainer = document.createElement("DIV");
    submitButtonContainer.id = "submitButtonContainer";
    var submitButton = document.createElement("BUTTON");
    submitButton.id = "choiceSubmitButton";
    submitButton.className = "button";
    submitButton.innerHTML = "<span>submit</span>";
    submitButton.style = "vertical-align:middle";
    submitButton.addEventListener("click", saveChoiceReason);
    submitButtonContainer.appendChild(submitButton);
    divArea.appendChild(submitButtonContainer);

}


async function saveChoiceReason() {
    var divArea = document.querySelector("#listChoiceReasonArea");
    var reason = document.querySelector("#choiceTextArea").value;
    //Ensure the user can not submit the reason twice
    divArea.removeChild(document.querySelector("#choiceTextArea"));
    divArea.removeChild(document.querySelector("#submitButtonContainer"));

    var listSubmitNotify = document.createElement("P");
    listSubmitNotify.id = "choiceSubmitNotify";
    listSubmitNotify.innerHTML = "Reasons sent! Waiting for processing!";
    listSubmitNotify.className = "statusMessage";
    document.querySelector("#listChoiceReasonArea").appendChild(listSubmitNotify);


    const sendData = {
        "id": sessionIDs[0],
        "sim": sessionIDs[1],
        "diff": sessionIDs[2],
        "choice": choice ? "different" : "similar",
        "choiceReason": reason
    };

    const options = {

        //[TODO] send to backend and store
        method: 'POST',
        //tells the server how the data is being sent over
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData)
    };

    var response = await fetch("/api/parsereason", options);
    response = await response.json();
    listSubmitNotify.innerHTML = "Reasons sent!";

    var finalMessage = document.createElement("P");
    finalMessage.id = "finalMessage";
    var mess = "You chose a list that was <strong>";
    mess += choice ? "DIFFERENT" : "SIMILAR";
    mess += "</strong> to your list";
    finalMessage.innerHTML = mess;
    document.querySelector("#listChoiceReasonArea").appendChild(finalMessage);

};
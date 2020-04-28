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
        //Ensure user can not resubmit list
        divArea.removeChild(document.querySelector("#listInputArea"));
        divArea.removeChild(document.querySelector("#listInputInstructions"));

        //Provide message that list has been sent
        var listSubmitNotify = document.createElement("P");
        listSubmitNotify.id = "listSubmitNotify";
        listSubmitNotify.className = "statusMessage";
        listSubmitNotify.innerHTML = "List sent! Waiting for result";
        document.querySelector("#listComparisonArea").appendChild(listSubmitNotify);

        //Get the IDs of the most similar and different lists
        let res = await fetch("/api/parselist", options);
        let response = await res.json();

        var userID = JSON.parse(response.userObj)._id;
        var simID = JSON.parse(response.sim)[0]._id;
        var diffID = JSON.parse(response.diff)[0]._id;
        sessionIDs = [userID, simID, diffID];
        listSubmitNotify.innerHTML = "List sent!";
        listComparison(response);


    } catch (error) {
        console.error(error);
    }
}

function listComparison(resp) {

    var simList, diffList, userList;
    var simButt, diffButt, userShow;
    var divArea = document.querySelector("#listComparisonArea");
    var instructionMess = document.createElement("P");
    instructionMess.id = "listInstructionMess";
    instructionMess.className = "instructions";
    instructionMess.innerHTML = "Which list do you think is more creative?";
    divArea.appendChild(instructionMess);

    var listTable = document.createElement("TABLE");
    listTable.id = "listTable";
    listTable.className = "table";
    var buttonRow, listRow;
    buttonRow = document.createElement("TR");
    buttonRow.id = "buttonRow";
    buttonRow.className = "table";
    listRow = document.createElement("TR");
    listRow.id = "listRow";
    listRow.className = "table";

    //Button row data
    var simButtContainer = document.createElement("TD");
    simButtContainer.id = "simButtContainer";
    simButtContainer.className = "table";
    simButt = document.createElement("BUTTON");
    simButt.id = "simButt";
    simButt.className = "table";
    simButt.innerHTML = "Option A";
    simButt.addEventListener("click", choseSim);
    simButtContainer.appendChild(simButt);

    var diffButtContainer = document.createElement("TD");
    diffButtContainer.id = "diffButtContainer";
    diffButtContainer.className = "table";
    diffButt = document.createElement("BUTTON");
    diffButt.innerHTML = "Option B";
    diffButt.id = "diffButt";
    diffButt.className = "table";
    diffButt.addEventListener("click", choseDiff);
    diffButtContainer.appendChild(diffButt);

    userShow = document.createElement("TD");
    userShow.id = "userShow";
    userShow.style.color = "red";
    userShow.className = "table";
    userShow.innerHTML = "Your list";

    buttonRow.appendChild(userShow);
    buttonRow.appendChild(simButtContainer);
    buttonRow.appendChild(diffButtContainer);


    var objDiff = JSON.parse(resp.diff);

    //List row data
    simList = document.createElement("TD");
    JSON.parse(resp.sim)[0].list.forEach((element) => {
        simList.innerHTML += (element + "<br>");
    });
    simList.id = "simList";
    simList.classList = "table tableText";

    diffList = document.createElement("TD");
    JSON.parse(resp.diff)[0].list.forEach((element) => {
        diffList.innerHTML += (element + "<br>");
    });
    diffList.id = "diffList";
    diffList.classList = "table tableText";

    userList = document.createElement("TD");

    JSON.parse(resp.userObj).list.forEach((element) => {
        userList.innerHTML += (element + "<br>");
    });
    userList.id = "userList";
    userList.classList = "table tableText";

    listRow.appendChild(userList);
    listRow.appendChild(simList);
    listRow.appendChild(diffList);

    //Append rows to list
    listTable.appendChild(listRow);
    listTable.appendChild(buttonRow);

    //Append table to div
    divArea.appendChild(listTable);

}


function choseSim() {
    document.querySelector("#simButtContainer").removeChild(document.querySelector("#simButt"));
    document.querySelector("#diffButtContainer").removeChild(document.querySelector("#diffButt"));
    document.querySelector("#simButtContainer").style.color = "green";
    document.querySelector("#simButtContainer").innerHTML = "SELECTED";
    reasonDisplay(0);
}

function choseDiff() {
    document.querySelector("#simButtContainer").removeChild(document.querySelector("#simButt"));
    document.querySelector("#diffButtContainer").removeChild(document.querySelector("#diffButt"));
    document.querySelector("#diffButtContainer").style.color = "green";
    document.querySelector("#diffButtContainer").innerHTML = "SELECTED";
    reasonDisplay(1);
}

function reasonDisplay(type) {

    choice = type;
    var divArea = document.querySelector("#listChoiceReasonArea");
    var instructionMess = document.createElement("P");
    instructionMess.id = "choiceInstructionMess";
    instructionMess.className = "instructions";
    instructionMess.innerHTML = "Why did you choose that list? (Please try to elaborate on your answer)";
    divArea.appendChild(instructionMess);

    var textBox = document.createElement("TEXTAREA");
    textBox.id = "choiceTextArea";
    divArea.appendChild(textBox);

    var submitButtonContainer = document.createElement("DIV");
    submitButtonContainer.id = "submitButtonContainer";
    var submitButton = document.createElement("BUTTON");
    submitButton.id = "choiceSubmitButton";
    submitButton.innerHTML = "submit";
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




}
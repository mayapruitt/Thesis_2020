let listInput;
var sessionID;

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
        const newData = {
            list: userInput.value.split("\n")
        };
        var options = {
            method: 'POST',
            //tells the server how the data is being sent over
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        };

        //Get the IDs of the most similar and different lists
        let response = await fetch("/api/v1/database", options);
        response = await response.json();
        // sessionID = response._id;
        console.log(response.sim);
        console.log(response.diff);
        //Get the next page with the new lists

        window.location.href = "/04_evaluate"


        userInput.value = "";
    } catch (error) {
        console.error(error);
    }
}
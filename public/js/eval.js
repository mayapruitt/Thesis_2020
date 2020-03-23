document.addEventListener("DOMContentLoaded", DOMLoaded);

async function DOMLoaded(event) {

    var options = {
        method: 'GET',
        //tells the server how the data is being sent over
        headers: { 'Content-Type': 'application/json' },
    };

    //Get the IDs of the most similar and different lists
    let response = await fetch("/api/v1/database/uLists", options);
    response = await response.json();

    console.log("DOM LOADED!\n");
    listInput = document.getElementById("listInput");

    //Add event listeners to buttons
    document.querySelector(".choiceButton__A").addEventListener("click", simNav)
    document.querySelector(".choiceButton__B").addEventListener("click", diffNav)

    var strSim = "";
    response.sim.forEach((element) => {
        strSim += (element + "<br>");
    });

    var strDiff = "";
    response.diff.forEach((element) => {
        strDiff += (element + "<br>");
    });
    document.querySelector(".listDisplay__A").innerHTML = strSim;
    document.querySelector(".listDisplay__B").innerHTML = strDiff;


}


function simNav() {

    window.location.href = "/05_reflectSame"
}

function diffNav() {

    window.location.href = "/05_reflectDiff";
}
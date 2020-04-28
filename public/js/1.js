document.addEventListener("DOMContentLoaded", DOMLoaded);


function DOMLoaded(event) {


    document.getElementById("tutorialBtn").addEventListener("click", gotoTutorial);
    document.getElementById("readyBtn").addEventListener("click", gotoExperiment);

}


function gotoTutorial() {
    window.location.href = "/tutorial";
}

function gotoExperiment() {
    window.location = "/1";
}
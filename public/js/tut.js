document.addEventListener("DOMContentLoaded", DOMLoaded);


function DOMLoaded(event) {


    document.getElementById("tutorialBtn").addEventListener("click", gotoExperiment);

}



function gotoExperiment() {
    window.location = "/1";
}
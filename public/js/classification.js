document.addEventListener("DOMContentLoaded", DOMLoaded);


function DOMLoaded(event){


    document.getElementById("classSubmit").addEventListener("click", submitText);
};


async function submitText(){

    const data = {
	text : document.getElementById("classInput").value
    };


    const options = {
	method : 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(data)
    };

    var response = await fetch("/trials/classification", options);
    response = await response.json();
    let p = document.createElement("P");
    
    p.innerHTML = JSON.stringify(response.results);
    document.getElementById("nnResults").appendChild(p);

    let p1 = document.createElement("P");
    p1.innerHTML = response.breakdown;
    document.getElementById("breakdown").appendChild(p1);
					    

    

}

class AltUsesTask extends React.Component {

    constructor(props){
	console.log(props);
	super(props);
	var str = new Date().toLocaleTimeString();
	this.state = {
	    val : 0,
	    interval : 0,
	    submitted: 0
	};
    }

    timeOut(){
	if(!this.state.submitted){
	    this.submit();
	}
    }

    async submit(){

	this.setState({submitted: 1});
	console.log("moving on!");
	
	var userInput = document.getElementById("listInput");
	document.getElementById("userListInput").removeChild(document.getElementById("listInputArea"));
	console.log(document.querySelector("#userListInput"));
	document.querySelector("#userListInput").removeChild(document.querySelector("#timer"));;
	
	const newData = {
	    list: userInput.value.split("\n")
        };
	    
        var options = {
	    method: 'POST',
	    //tells the server how the data is being sent over
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(newData)
        };

	var listSubmitNotify = document.createElement("P");
        listSubmitNotify.id = "listSubmitNotify";
        listSubmitNotify.className = "statusMessage";
        listSubmitNotify.innerHTML = "List sent!";
        //have list sent first then next question appear with no message about it

        userListInput.appendChild(listSubmitNotify);
	
        let res = await fetch("/api/parselist", options);
        let response = await res.json();
	this.props.nextState(response);

    }


    render(){
	const element = (
	        <div className="debug" id="userListInput">
		<h3 className="debug" id="mainInstructions">In two minutes, list all the different ways you could use a:</h3>
		<h3 id="listCreationObject" className="object debug">cup</h3>
		
		<div id="listInputInstructions" className="instructionsContainer debug">
		<h3 id="listInputInstructions" className="debug">Type each use on a new line.</h3>
		</div>
		
		<Timer id="timer" duration="10" timeoutFunc={this.timeOut.bind(this)} />

		<div id="listInputArea">
		<textarea id="listInput"></textarea>		
		<div id="newPartButton" className="submitButton">
                <button className="button" id="makeNewPart" onClick={this.submit.bind(this)}><span>submit</span></button>
		</div>		
		</div>
		
		</div>
	);

	return element;
    }
}

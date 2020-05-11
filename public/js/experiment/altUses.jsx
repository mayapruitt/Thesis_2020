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
	document.getElementById("listInputArea").removeChild(document.getElementById("submitListButton"));
	document.getElementById("listInputArea").removeChild(document.querySelector("#timer"));;
	
	const newData = {
	    list: userInput.value.split("\n")
        };

	userInput.remove();
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
	document.getElementById("listInputArea").appendChild(listSubmitNotify);
	
        let res = await fetch("/api/parselist", options);
        let response = await res.json();
	this.props.nextState(response);

    }


    render(){
	const element = (

	        <div id="listInputArea" className="debug">
		<h3 id="listInstructions" className="debug">List all the different ways you could use a:<span className="object">cup</span></h3>
		<Timer id="timer" className="timer" duration="500" timeoutFunc={this.timeOut.bind(this)} />
		<textarea id="listInput" placeholder="Type each use on a new line"></textarea>
		<button id="submitListButton" onClick={this.submit.bind(this)}><span>submit</span></button>
		</div>
	);

	return element;
    }
}

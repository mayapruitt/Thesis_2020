class ListComparison extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    lists : this.props.listObjects,
	    chosen: 0,
	    submitted : 0
	}
    }

    choseList(listNum){
	console.log(listNum);
	this.setState({chosen : listNum});
    }

    
    timeOut(){
	console.log("Timeout!");
	if(!this.state.submitted){
	    this.submit("finished");
	}
    }


    async submit(val){
	
	this.setState({submitted : 1});
	var reasonArea = document.getElementById("listChoiceReasonArea");
	console.log(reasonArea);

	reasonArea.removeChild(document.querySelector("#submitButtonContainer"));
	console.log(document.getElementById("choiceTextArea").value);
	var reason = document.getElementById("choiceTextArea").value;
	reasonArea.removeChild(document.querySelector("#choiceTextArea"));
	reasonArea.removeChild(document.querySelector("#timer"));
	const sendData = {
	    "id": JSON.parse(this.state.lists.userObj)._id,
	    "sim": JSON.parse(this.state.lists.sim)[0]._id,
	    "diff": JSON.parse(this.state.lists.diff)[0]._id,
	    "choice": this.state.chosen == 2 ? "different" : "similar",
	    "choiceReason": reason
	};

	const options = {
	    method: 'POST',
	    //tells the server how the data is being sent over
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(sendData)
	};
	
	console.log(reason);
	var reasonSubmitNotify = document.createElement("P");
        reasonSubmitNotify.id = "reasonSubmitNotify";
        reasonSubmitNotify.className = "statusMessage";
        reasonSubmitNotify.innerHTML = "Reason sent!";
        //have list sent first then next question appear with no message about it

        document.getElementById("listChoiceReasonArea").appendChild(reasonSubmitNotify);
	

	var response = await fetch("/api/parsereason", options);
	response = await response.json();

	console.log(response);
	this.props.nextState(response);
    }

    //Parse and create the list of items to display
    parseList(list){
	var retStr = [];
	list.forEach((element, index) => {
	    retStr.push( <p className="debug list" key={index}>{element}</p>);
	});
	return retStr;
    }

    //Renders the second part of the page
    reasonEntryFormat(){
	console.log("AAA");
	return (
		<div id="listChoiceReasonArea">
		<p id="choiceInstructionMess" className="instructions">Think deeply now, and in two minutes, write as much as you can – Why did you choose that list? (The more detail you provide here, the better your analysis will be!)</p>
		<Timer id="timer" duration="120" timeoutFunc={this.timeOut.bind(this)} />
		
		<textArea id="choiceTextArea"></textArea>
		<div id="submitButtonContainer">
		<button id="choiceSubmitButton" className="button" onClick={this.submit.bind(this)}><span>submit</span></button>
		</div>
		</div>
	)
    }

    //Renders the dynamic buttons
    renderButton(id_, text, state){
	if(!this.state.chosen){
	    return <button id={id_} className="button" onClick={()=>this.choseList(state)}><span>{text}</span></button>
	}

	console.log(state + " " + this.state.chosen);
	if(this.state.chosen == state){
	    return <p style={{color:"green"}}>SELECTED</p>
	}

	return <p></p>
    }
    
    render() {
	let enterReason;

	if(this.state.chosen){
	    enterReason = this.reasonEntryFormat();
	}
	const element = (
	      <div>
	      <div id="listComparisonArea" className="debug">

	      <div id="evalInstruction" className="debug instructions">
	      Which of the following lists do you find more creative?
	      </div>

	    <div id="lists-container" className="debug">
		
	    <div id="yourListArea" className="debug">
		{this.parseList(JSON.parse(this.state.lists.userObj).list)}
		<p id="yourListTitle">Your List</p>
	    </div>
		
	    <div id="simListArea" className="debug">
		{this.parseList(JSON.parse(this.state.lists.sim)[0].list)}
	    {this.renderButton("simButt", "A", 1)}
	    </div>
		
	    <div id="diffListArea" className="debug">
		{this.parseList(JSON.parse(this.state.lists.diff)[0].list)}
	    {this.renderButton("simButt", "B", 2)}

	    </div>
	    
	    </div>
	    </div>
	    
	{enterReason}
	
	</div>
		
	);
	return element;

    }
}

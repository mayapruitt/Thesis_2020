class ListComparison extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    lists : this.props.listObjects,
	    chosen: 0,
	    submitted : 0,
	    videoEnded : 0
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


    videoEnded(){
	this.setState({videoEnded: 1});

    }

    componentDidMount(){
	ReactDOM.render(<source src="/assets/listComparison/part2.mp4" type="video/mp4" />,
	    document.getElementById('video')
		       );
	document.getElementById('video').load();
	document.getElementById('video').onended = this.videoEnded.bind(this);
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
	      <p id="choiceInstructionMess" className="instructions">Now in 2 minutes, write as much as you can – Why did you choose that list?</p>
	      <Timer id="timer" className="timer" duration="120" timeoutFunc={this.timeOut.bind(this)} />
		
	      <textArea id="choiceTextArea" className="userInput" placeholder="The more detail you provide here, the better your analysis will be!"></textArea>
	      <div id="submitButtonContainer">
		<button id="choiceSubmitButton" className="submitButton" onClick={this.submit.bind(this)}><span>submit</span></button>
	      </div>
	    </div>
	)
    }

    //Renders the dynamic buttons
    renderButton(id_, text, state){
	if(!this.state.chosen){
	    return <button id={id_} className="listButton" onClick={()=>this.choseList(state)}><span>{text}</span></button>
	}

	console.log(state + " " + this.state.chosen);
	if(this.state.chosen == state){
	    	return <button id={id_} className="listButtonChosen" ><span>{text}</span></button>
	}

	return <button id={id_} className="listButtonOther" ><span>{text}</span></button>
    }

    
    
    render() {
	let enterReason;

	if(this.state.chosen){
	    enterReason = this.reasonEntryFormat();
	}
	const element = (
	    this.state.videoEnded ? 
	    <div>
	      <link rel="stylesheet" href="./styles/experiment.css" />
	      <div id="selectionArea" className="debug">
		<h3 id="evalInstructions" className="debug">Between these two lists, which is the most creative?</h3>
		<div id="listsContainer">

		  <div id="yourListArea" className="debug">
		    <p className="userListSpace">Your List</p>

		    {this.parseList(JSON.parse(this.state.lists.userObj).list)}
		  </div>

		  {this.renderButton("simListButton",
				     this.parseList(JSON.parse(this.state.lists.sim)[0].list),
		  1)}
	    
		  {this.renderButton("diffListButton",
				     this.parseList(JSON.parse(this.state.lists.diff)[0].list),
		  2)}

		</div>
	      </div>
	      {enterReason}
	    </div>

	    : <div></div>

	);
	return element;

    }
}

class AltUsesTask extends React.Component {

    constructor(props){
	super(props);
	var str = new Date().toLocaleTimeString();
	this.state = {
	    val : 0,
	    interval : 0,
	    submitted: 0,
	    videoEnded: 1
	};
    }

    timeOut(){
	if(!this.state.submitted){
	    this.submit();
	}
    }

    async submit(){

	this.setState({submitted: 1});
	
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

    videoEnded(){
	this.setState({videoEnded: 1});
    }

    componentDidMount(){
	ReactDOM.render(<source src="/assets/straightThrough/straightthru.mp4" type="video/mp4" />,
	    document.getElementById('video')
		       );
	document.getElementById('video').load();
	document.getElementById('video').onended = this.videoEnded.bind(this);

    }

    render(){
	return (
	    this.state.videoEnded ? 
	    <div>
	      <link rel="stylesheet" href="./styles/experiment.css" />

	    <div id="listInputArea" className="debug">
	      <h3 id="listInstructions" className="debug">In 2 minutes, list all the different ways you could use a:<span className="object">cup</span></h3>
	      <Timer id="timer" className="timer" duration="120" timeoutFunc={this.timeOut.bind(this)} />
	      <textarea id="listInput" placeholder="Type each use on a new line"></textarea>
	      <button id="submitListButton" onClick={this.submit.bind(this)}><span>submit</span></button>
	      </div>
		</div>

	    : <div></div>

	);


    }
}

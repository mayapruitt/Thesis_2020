class Timer extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    timerVal : this.props.duration,
	    timerStr : "",
	    interval : -1
	}
    }

        //Function to format and display the countdown
    displayTime(){
	return parseInt(+this.state.timerVal / 60) +
	    ":" + (this.state.timerVal % 60 < 10 ? "0"
		   + (this.state.timerVal % 60) :
		   (this.state.timerVal % 60))
    }


    
    step(){
	this.setState({timerVal: --this.state.timerVal});
	
	if(this.state.timerVal < 0){
	    clearInterval(this.state.interval);
	    this.setState({timerStr : "TIME OUT!"});
	    this.props.timeoutFunc();
	    return;
	}
	this.setState({timerStr : this.displayTime()});
    }

    componentDidMount(){
	this.setState({timerStr : this.displayTime()});
	this.setState({interval: setInterval(this.step.bind(this), 1000)});
    }

    componentWillUnmount(){
	if(this.state.interval >= 0){
	    clearInterval(this.state.interval);
	}
    }

    
    render(){
	return <div id={this.props.id} className={this.props.className}>{this.state.timerStr}</div>;
    }
    
}


class ExperimentManager extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    state : props.state ? +props.state : 0,
	    listObjects : 0,
	    analysis: 0
	};
    }

    nextState(val){
	switch(this.state.state){
	case 0:
	    this.setState({listObjects : val});
	    break;
	case 1:
	    this.setState({analysis : val});
	    break;
	default:
	    break;
	}
	this.setState({state : ++this.state.state});
    }
    
    render(){
	switch(+this.state.state){
	case 0:
	    console.log("sure!");
	    return <AltUsesTask nextState={this.nextState.bind(this)}/>;
	case 1:
	    return <ListComparison listObjects={this.state.listObjects} nextState={this.nextState.bind(this)}/>;
	case 2:
	    return <AnalysisDisplay analysisResults={this.state.analysis} nextState={this.nextState.bind(this)}/>
	default:
	    break;
	}
	return <div>Thank you!</div>
    }
}

ReactDOM.render(<ExperimentManager state="0"/>, document.getElementById('experimentContent'));



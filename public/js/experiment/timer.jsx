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

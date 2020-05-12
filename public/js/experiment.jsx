class ExperimentManager extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    intro : 1,
	    state : props.state ? +props.state : 0,
	    listObjects : 0,
	    analysis: 0
	};
    }

    nextState(val){
	switch(this.state.intro){
	case 0:
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
	    break;
	    
	case 1:
	case 2:
	    switch(val){
	    case 0: //show tutorial
		this.setState({intro : 2});
		break;
	    case 1: //start experiment
		console.log("SURE!");
		this.setState({intro : 0});
		break;
	    default:
		break;
	    }
	    break;
	    
	default:
	    break;
	}
    }


    
    render(){

	if(+this.state.intro){
	    if(+this.state.intro == 2){ //show tutorial
		return <Tutorial nextState={this.nextState.bind(this)}/>
	    }
	    return <HomePage nextState={this.nextState.bind(this)}/>
	}
	
	switch(+this.state.state){
	case 0:
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

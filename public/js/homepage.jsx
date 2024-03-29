class HomePage extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    videoEnded : 0
	};

    }

    videoEnded(){
	console.log("ended");
	this.setState({videoEnded: 1});
    }

    componentDidMount(){
	ReactDOM.render(<source src="/assets/intro/intro.mp4" type="video/mp4" />,
	    document.getElementById('video')
		       );
	document.getElementById('video').load();
	document.getElementById('video').onended = this.videoEnded.bind(this);

	    
    }



    render(){
	return (
	    this.state.videoEnded ? 
	    <div>
	      <link rel="stylesheet" href="/styles/home.css" />
		<div className="all-content">
		  <div className="button-container debug">
		    <button className="button" id="tutorialBtn"
			    style={{verticalAlign:"middle"}}
			    onClick={()=>this.props.nextState(0)}><span>tutorial</span></button>
		    <button className=" button" id="readyBtn"
			    style={{verticalAlign : "middle"}}
			    onClick={()=>this.props.nextState(1)}><span>ready?</span></button>
		  </div>
		</div>
		</div>

		: <div></div>
	);

    }



}

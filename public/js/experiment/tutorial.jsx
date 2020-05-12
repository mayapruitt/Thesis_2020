class Tutorial extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    videoEnded : 0
	};
    }

    videoEnded(){
	this.setState({videoEnded: 1});
    }


    componentDidMount(){
	ReactDOM.render(<source src="/assets/tutorial/expectations.mp4" type="video/mp4" />,
	    document.getElementById('video')
		       );
	document.getElementById('video').load();
	document.getElementById('video').onended = this.videoEnded.bind(this);
    }


    render(){
	return (
	    this.state.videoEnded ?
	    <div>
	      <link rel="stylesheet" href="./styles/tutorial.css" />
	      <div className="all-content">
		<div className="headers">
		  <h1 className="header debug">This is a three-part experience:</h1>
		</div>
		<div className="info-container debug">
		  <ol className="tagline debug">
		    <li>Engage in a creativity exercise where you will think of alternative uses for a common object.
		    </li>
		    <li>Evaluate the creativity of those who came before you</li>
		    <li>Reflect on why you’ve made specific choices </li>
		  </ol>
		  <p className="backend-info">Along the way, a neural network will analyze your responses*, so that at the end it can tell you more about what influences your thoughts on creativity. The more information you provide, the more detailed the analysis will be!</p>
		  <p className="fine-print">*Any data submitted remains anonymous</p>
		</div>
		<div className="button-container debug">
		  
		  <button className="button" id="tutorialBtn"
			  style={{verticalAlign:"middle"}}
			  onClick={()=>this.props.nextState(1)}>
		    <span>ready?</span>
		  </button>
		  
		</div>
	      </div>
		</div>

		: <div></div>
	)
    }
}

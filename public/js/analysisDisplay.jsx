class AnalysisDisplay extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    nnResults : this.props.analysisResults.results,
	    breakdown : this.props.analysisResults.breakdown,
	    percentsSet : 0,
	    svgSize     : 500,
	    videoEnded : 0
	    
	};
    }

    setCirclePercentages(percents) {
	let el, radius, circum;
	percents.forEach((element, index) => {
            el = document.getElementById(`circle${index + 1}`);
            radius = el.r.baseVal.value;
            circum = (radius * (2 * Math.PI));
            let x = (2 * Math.PI) * (element / 100);
            document.getElementById(`circle${index + 1}`).style.strokeDasharray = `${circum}`;
            document.getElementById(`circle${index + 1}`).style.strokeDashoffset = `${circum}`;
            document.getElementById(`circle${index + 1}`).style.strokeDashoffset = `${circum - (circum * (element/100))}`;

    });
    }

    
    removeNestedPhrases(){
	//Get all phrase elements
	var allPhrases = document.getElementById("phraseDiv").getElementsByClassName("phrase");

	//If there are nested phrases, mark them for deletion
	Array.prototype.forEach.call(allPhrases, (element)=>{

	    //is a root element
	    if(element.parentNode.className != "phrase-info"){
		var el = element.getElementsByClassName("phrase")[0];
		//Set the nested element to the word instead
		if(el){
		    var str = el.attributes.content.nodeValue;
		    //Word is encased to not be identified
		    el.innerHTML = str.substr(2, str.length-4);
		}
	    }
	});

    }

    videoEnded(){

	this.setState({videoEnded: 1});
	this.removeNestedPhrases();
	this.setCirclePercentages([(this.state.nnResults.process * 100).toFixed(2), (this.state.nnResults.person * 100).toFixed(2), (this.state.nnResults.product * 100).toFixed(2), (this.state.nnResults.press * 100).toFixed(2)]);
	this.setState({percentsSet : 1});

    }

    componentDidMount(){
	ReactDOM.render(<source src="/assets/analysis/analysis_load.mp4" type="video/mp4" />,
	    document.getElementById('video')
		       );
	document.getElementById('video').load();
	document.getElementById('video').onended = this.videoEnded.bind(this);
    }

    
    render(){
	
	return (
	    this.state.videoEnded ? (
		<div id="analysis" className="debug">
		  <div id="userTextArea" className="debug">
		    <div id="offboard">
                      <p id="offboardText"><span>This is a breakdown of your subjectivity.</span>
			 Your response has been analyzed by a neural net and these are the results.
			Each percentage is how closely your response matches current scientific perspectives on creativity. 
			Roll over highlighted words to learn more from creativity research.</p>
		    </div>
		    <div id="phraseDiv" dangerouslySetInnerHTML={{__html: this.state.breakdown }}></div>
		    <div id="categoriesArea" className="debug">
                      <div id="categoryNameArea" className="debug">
			<div className="categoryName debug">
			  {/* <button className="categoryButton debug"></button> */}
			  <p id="process">process</p>
			  <p className="percent">{(this.state.nnResults.process * 100).toFixed(2)}%</p>
			</div>
			<div className="categoryName debug">
			  {/* <button className="categoryButton debug"></button> */}
			  <p id="person">person</p>
			  <p className="percent">{(this.state.nnResults.person * 100).toFixed(2)}%</p>
			</div>
			<div className="categoryName debug">
			  {/* <button className="categoryButton debug"></button> */}
			  <p id="product">product</p>
			  <p className="percent">{(this.state.nnResults.product * 100).toFixed(2)}%</p>
			</div>
			<div className="categoryName debug">
			  {/* <button className="categoryButton debug"></button> */}
			  <p id="press">press</p>
			  <p className="percent">{(this.state.nnResults.press * 100).toFixed(2)}%</p>
			</div>
                      </div>
                      <div id="circlegraph" className="debug">
			<svg className="progress-ring" width={this.state.svgSize} height={this.state.svgSize}>

		          <circle
		            className="progress-ring__circle"
		            id="circle1"
		            stroke = "#9CD6F9"
		            strokeWidth="12"
		            fill="transparent"
		            strokeDashoffset="0"
		            r={this.state.svgSize/10}
			    cx={this.state.svgSize/2}
                            cy={this.state.svgSize/2}>

                          </circle>
		          <circle
		            className="progress-ring__circle "
		            id="circle2"
		            stroke = "#F49F0A"
		            strokeWidth="12"
		            fill="transparent"
		            strokeDashoffset = "0"
                            r={this.state.svgSize/10 + ((this.state.svgSize/10) * 1)}
			    cx={this.state.svgSize/2}
                            cy={this.state.svgSize/2}>

                          </circle>     
		          <circle
                            className="progress-ring__circle "
                            id="circle3"
                            stroke = "#00A6A6"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDashoffset = "0"
			    r={this.state.svgSize/10 + ((this.state.svgSize/10) * 2)}

			    cx={this.state.svgSize/2}
                            cy={this.state.svgSize/2}>

                          </circle>
                          <circle
                            className="progress-ring__circle "
                            id="circle4"
                            stroke = "#EFCA08"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDashoffset = "0"
			    r={this.state.svgSize/10 + ((this.state.svgSize/10) * 3)}

                            cx={this.state.svgSize/2}
                            cy={this.state.svgSize/2}>

                          </circle>

		        </svg>
                      </div>
		    </div>
		    <p className="categoryDef"><b>Process</b> looks at cognitive processes involved in creativity, like thinking outside the box. <b>Person</b> studies the characteristics of creative people. 
                       <b>Product</b> is more concerned with creative outcomes themselves. 
                       <b>Press</b> deals with the relationship between people and their environment, such as the influence of culture.</p>
		  </div>

		  {/* <div id="researchInfoContainer" className="debug">
		  </div> */}

		</div>
	    )
		:
		(<div></div>)
	);
    }
}

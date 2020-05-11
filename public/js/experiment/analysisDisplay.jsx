class AnalysisDisplay extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    nnResults : this.props.analysisResults.results,
	    breakdown : this.props.analysisResults.breakdown,
	    percentsSet : 0
	};
    }

    setCirclePercentages(percents) {
	let el, radius, circum;
	percents.forEach((element, index) => {
            el = document.getElementById(`circle${index + 1}`);
            radius = el.r.baseVal.value;
            console.log(radius);
            circum = (radius * (2 * Math.PI));
            let x = (2 * Math.PI) * (element / 100);
            document.getElementById(`circle${index + 1}`).style.strokeDasharray = `${circum}`;
            document.getElementById(`circle${index + 1}`).style.strokeDashoffset = `${circum}`;
            document.getElementById(`circle${index + 1}`).style.strokeDashoffset = `${circum - (circum * (element/100))}`;

    });
    }

    componentDidMount(){
	this.setCirclePercentages([(this.state.nnResults.press * 100).toFixed(2), (this.state.nnResults.product * 100).toFixed(2), (this.state.nnResults.person * 100).toFixed(2), (this.state.nnResults.process * 100).toFixed(2)]);
	this.setState({percentsSet : 1});
    }

	


    render(){
	
	return (
	    <div id="analysis" className="debug">
	      <div id="userTextArea" className="debug">
		<div dangerouslySetInnerHTML={{__html: this.state.breakdown }}></div>
		<div id="categoriesArea" className="debug">
                  <div id="categoryNameArea" className="debug">
                    <div className="categoryName debug">
                      <button className="categoryButton debug"></button>
                      <p id="process">process</p>
                      <p className="percent">{(this.state.nnResults.process * 100).toFixed(2)}%</p>
                    </div>
                    <div className="categoryName debug">
                      <button className="categoryButton debug"></button>
                      <p id="person">person</p>
                      <p className="percent">{(this.state.nnResults.person * 100).toFixed(2)}%</p>
                    </div>
                    <div className="categoryName debug">
                      <button className="categoryButton debug"></button>
                      <p id="product">product</p>
                      <p className="percent">{(this.state.nnResults.product * 100).toFixed(2)}%</p>
                    </div>
                    <div className="categoryName debug">
                      <button className="categoryButton debug"></button>
                      <p id="press">press</p>
                      <p className="percent">{(this.state.nnResults.press * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                  <div id="circlegraph" className="debug">
                    <img id="placeholder" className="debug" src="/assets/circle_testgraphic.png" alt="circle graph" />
                  </div>
		</div>
		<p className="categoryDef">info about the category</p>
	      </div>

              <div id="researchInfoContainer" className="debug">
		<p id="researchinfo">tation ullamcorper suscipit lobortis nisl ut aliquip ex Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan</p>
              </div>


	      <div>
		<svg className="progress-ring" width="300px" height="300px">
		  <circle
		    className="progress-ring__circle"
		    id="circle1"
		    stroke = "#BBDEF0"
		    strokeWidth="12"
		    fill="transparent "
		    strokeDashoffset="0"
		    r="20"
		    cx="160"
		    cy="160">
		  </circle>
		  <circle
		    className="progress-ring__circle "
		    id="circle2"
		    stroke = "#nF49F0A"
		    strokeWidth="12"
		    fill="transparent "
		    strokeDashoffset = "0"
		    r="50"
		    cx="160 "
		    cy="160 ">
		  </circle>
		  <circle
		    className="progress-ring__circle "
		    id="circle3"
		    stroke = "#00A6A6"
		    strokeWidth="12"
		    fill="transparent "
		    strokeDashoffset = "0"
		    r="80"
		    cx="160 "
		    cy="160 ">
		  </circle>
		  <circle
		    className="progress-ring__circle "
		    id="circle4"
		    stroke = "#EFCA08"
		    strokeWidth="12"
		    fill="transparent "
		    strokeDashoffset = "0"
		    r="110"
		    cx="160 "
		    cy="160 ">
		  </circle>
		  
		  
		</svg>
	      </div>
	    </div>

	);
    }
}

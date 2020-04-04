import React, { Component } from 'react'

class TulipPopup extends Component{
	
	constructor(props){
		super(props);
	}

	render() {
	
        return <div>
            		<p>Owner: {this.props.tulip.owner} </p>
            		<p>Generation: {this.props.tulip.generation} </p>
            		<p>Colors: {this.props.tulip.R} </p>
            		<p>Mother ID: {this.props.tulip.mother} </p>
        </div>
    }
} 

export default TulipPopup;

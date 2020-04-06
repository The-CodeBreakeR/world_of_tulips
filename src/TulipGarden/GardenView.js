import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import TulipView from "./TulipView"
import '../css/garden.css'
import Tulip from "./Tulip"

class GardenView extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return <div>
		<div className="container">
	    		<div className="blueSky"></div>
	        	<div className="sun"></div>
	        	<div className="bcloud1"></div>
	        	<div className="bcloud2"></div>
	        	<div className="bcloud3"></div>
	        	<div className="bcloud4"></div>
    	        <div className="grassLand"></div>
				{this.props.tulips.map((tulip, index) => (
        			<Tulip key={index} number = {index} tulip={tulip} />
      			))}
	    	</div>
    	</div>
	}
}


export default GardenView;
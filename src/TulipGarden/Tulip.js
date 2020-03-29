import React, { Component } from 'react'
import TulipPopup from './TulipPopup'
import {Popup} from 'semantic-ui-react'

class Tulip extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		return <div>

		<Popup 
			trigger={<div id = {'position' + (this.props.number + 1).toString()} className="tulip">
			<div className="triangle-centre"></div>
			<div className="triangle-left"></div>
			<div className="triangle-right"></div>
			<div className="semi-circle"></div>
            
			<div className="head">
			<div id="eye-1" className="eye"></div>
			<div id="eye-2" className="eye"></div>
			<div className="mouth"></div>
			</div>

			<div className="trunk">
			<div className="left-branch"></div>
			<div className="right-branch"></div>
			</div>
			<div className="vase"></div>
			</div>
		}
			content={<TulipPopup tulip = {this.props.tulip}/>}
			position = 'top center' />
		</div>
	}
}

export default Tulip;
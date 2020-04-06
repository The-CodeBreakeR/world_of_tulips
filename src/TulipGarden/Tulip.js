import React, { Component } from 'react'
import TulipPopup from './TulipPopup'
import {Popup} from 'semantic-ui-react'

class Tulip extends Component{
	
	constructor(props){
		super(props);
		console.log(this.props);
	}

	render(){

		var colors = ['rgb(254, 136, 26)', ' rgb(254, 195, 213)',  'rgb(252, 235, 3)', 'rgb(66, 179, 245)']
		var mycolor = 'rgb(' + this.props.tulip.R + ',' + this.props.tulip.G + ',' + this.props.tulip.B + ')';

		return <div>
		<Popup 
			trigger={<div id = {'position' + (this.props.number + 1).toString()} className="tulip">
			<div className="triangle-centre" style={{'borderBottom': '55px solid ' + mycolor}}></div>
			<div className="triangle-left" style={{'borderBottom': '50px solid ' + mycolor}}></div>
			<div className="triangle-right" style={{'borderBottom': '50px solid ' + mycolor}}></div>
			<div className="semi-circle" style={{'background': mycolor}}></div>
            
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
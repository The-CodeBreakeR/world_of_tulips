import React, { Component } from 'react'
import MinimalisticTulipProfile from './MinimalisticTulipProfile'
import {Popup} from 'semantic-ui-react'

class Tulip extends Component{
	
	constructor(props){
		super(props);
		console.log(this.props.tulip);
	}

	render(){
		return <div>
		<div className='container'>
        <div className="box">
        	<Popup 
			trigger={<div className="flower"></div>}
			content={<MinimalisticTulipProfile tulip = {this.props.tulip}/>}
			position = 'right center' />
            <div className="stem">
				<div className="line"></div>
                <div className="leaf leaf01"></div>
            </div>
        </div>
    	</div>
		</div>
	}
}

export default Tulip;
import React, { Component } from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'


class MinimalisticTulipProfile extends Component{
	
	constructor(props){
		super(props);
	}

	render() {
	
        return <div>
            		<p>Owner: {this.props.tulip.owner} </p>
            		<p>Generation: {this.props.tulip.generation} </p>
            		<p>Colors: {this.props.tulip.R, this.props.tulip.G, this.props.tulip.B } </p>
            		<p>Mother ID: {this.props.tulip.mother} </p>
        </div>
    }
} 

export default MinimalisticTulipProfile;

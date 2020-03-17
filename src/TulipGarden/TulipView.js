import React, { Component } from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'
import TulipProfile from "./TulipProfile"


class TulipView extends Component{
	
	constructor(){
		super();
	}

	render(){
		return <div>
			<TulipProfile {...this.props}/>
		</div>
	}
}

export default TulipView;
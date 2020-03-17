import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import TulipView from "./TulipView"

class GardenHome extends Component {

	constructor(props){
		super(props);
		this.getBulbNumber();
		this.digBulb = this.digBulb.bind(this);
		this.getTulip = this.getTulip.bind(this);
	}

	state = { activeItem: 'Market', num: 0, tulips: 0, tulip: 0}

	async getBulbNumber(){
		var num = await this.props.worldOfTulips.methods.getUnderGroundBulbNum().call();
		this.setState({num : num});
  	}

  	async digBulb(){
		const gasAmount = await this.props.worldOfTulips.methods.digToFindBulb().estimateGas({from: this.props.userAccount});
  		var bulbId = await this.props.worldOfTulips.methods.digToFindBulb().send({from: this.props.userAccount, gas: gasAmount});
  		this.getBulbNumber();
  		this.getTulip(bulbId.events.Generation0BulbFound.returnValues.bulbID);
  	}

  	async getTulip(id){
  		var tulip = await this.props.worldOfTulips.methods.getTulip(id).call();
  		console.log(tulip);
  		this.setState({tulip:tulip});
  	}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return <div>
        	<p> Overall Number of Bulbs: {this.state.num} </p>
        	<Button onClick={this.digBulb} content='Dig for Tulip'/>
        	<TulipView {...this.props} tulip={this.state.tulip}/>
            <p>This is the home to Tulip Garden. Everything you need is in props, connect to contracts here.</p>
        </div>
    }
}

export default GardenHome;

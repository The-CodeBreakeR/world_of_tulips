import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import TulipView from "./TulipView"
import '../css/tulip.css'

import Tulip from "./Tulip"
import GardenView from "./GardenView"

class GardenHome extends Component {

	constructor(props){
		super(props);
    this.getAllTulips();
    this.getBulbNumber();
  }

  componentDidMount(){
    this.digBulb = this.digBulb.bind(this);
    this.getTulip = this.getTulip.bind(this);  
  }

  // Initialize the respective elements, state to indicate loading
  state = { activeItem: 'Market', num: 0, tulips: [], tulip: 0, loading: true}

  async getBulbNumber(){
    this.setState ({loading: true})
    var num = await this.props.worldOfTulips.methods.getUnderGroundBulbNum().call();
    this.setState({
      num : num,
      loading: false
    });
  }

  async getAllTulips(){
    this.setState({loading: true});
    var ownedTulipIDs = await this.props.worldOfTulips.methods.getAllOwnedTulipIDs(this.props.userAccount).call({from: this.props.userAccount});
    for (var i = 0; i < ownedTulipIDs.length ;i++) {
        const tulip = await this.getTulip(ownedTulipIDs[i]);
        console.log(tulip);
        this.setState({
          tulips:[...this.state.tulips, tulip]
        });
      }
    this.setState({ loading: false });
  } 

  async digBulb(){
    this.setState ({loading: true});
    const gasAmount = await this.props.worldOfTulips.methods.digToFindBulb().estimateGas({from: this.props.userAccount});
    var bulbId = await this.props.worldOfTulips.methods.digToFindBulb().send({from: this.props.userAccount, gas: gasAmount});
    this.setState({ loading: false });
    this.getBulbNumber();
    this.getTulip(bulbId.events.Generation0BulbFound.returnValues.bulbID);
  }

  async getTulip(id){
    this.setState ({loading: true});
    var tulip = await this.props.worldOfTulips.methods.getTulip(id).call();
    this.setState({ loading: false });
    return tulip;
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return <div>
    <p> Overall Number of Bulbs: {this.state.num} </p>
    {this.state.loading ? ('Loading...') : (<GardenView {...this.props} tulips = {this.state.tulips} />)} 
    <div>
    <Button onClick={this.digBulb} content='Dig for Tulip'/>
    {this.state.loading ? ('Loading...') : (<TulipView {...this.props} tulips = {this.state.tulips} />)} 
    </div>
    </div>

  }
}

export default GardenHome;

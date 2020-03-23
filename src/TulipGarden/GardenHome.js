import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import TulipView from "./TulipView"
import Tulip from "./Tulip"
import '../css/garden.css'

class GardenHome extends Component {

	constructor(props){
		super(props);
    this.loadTulips();
    this.getBulbNumber();
    this.digBulb = this.digBulb.bind(this);
    this.getTulip = this.getTulip.bind(this);
  }

  // Initialize the respective elements, state to indicate loading
  state = { activeItem: 'Market', num: 0, tulips: [], tulip: 0, loading: true}

  async getBulbNumber(){
    this.setState ({loading: true})
    var num = await this.props.worldOfTulips.methods.getUnderGroundBulbNum().call().then(this.setState ({loading: false}));
    this.setState({num : num});
  }

  // Load the tulips for the account that is currenlty logged in
  async loadTulips(){
    // We load the tulips with IDs 0 to 9, as a placeholder, later we need a dedicated function
    for (var i = 1; i < 10; i++){
      const tulip = await this.getTulip(i);
      if (tulip) {
        this.setState({
          tulips:[...this.state.tulips, tulip]
        });
      }
    }
    this.setState ({loading: false})
  }

  async digBulb(){
    this.setState ({loading: true});
    const gasAmount = await this.props.worldOfTulips.methods.digToFindBulb().estimateGas({from: this.props.userAccount});
    var bulbId = await this.props.worldOfTulips.methods.digToFindBulb().send({from: this.props.userAccount, gas: gasAmount}).then(this.setState ({loading: false}));
    this.getBulbNumber();
    this.getTulip(bulbId.events.Generation0BulbFound.returnValues.bulbID);
  }

  async getTulip(id){
    this.setState ({loading: true});
    var tulip = await this.props.worldOfTulips.methods.getTulip(id).call().then(this.setState ({loading: false}));
    return tulip;
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return <div>
    <div className='container'>
    {this.state.loading ? ('Loading...') : (<Tulip {...this.props} tulip = {this.state.tulips[0]} />)} 
    </div>
    <div>
    <p> Overall Number of Bulbs: {this.state.num} </p>
    <Button onClick={this.digBulb} content='Dig for Tulip'/>
    {this.state.loading ? ('Loading...') : (<TulipView {...this.props} tulips = {this.state.tulips} />)} 
    </div>
    </div>

  }
}

export default GardenHome;

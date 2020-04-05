import React, { Component } from 'react'
import { Button, Message } from 'semantic-ui-react'
import TulipView from "./TulipView"
import '../css/tulip.css'

import Tulip from "./Tulip"
import GardenView from "./GardenView"

class GardenHome extends Component {

	constructor(props){
		super(props);
  }

  componentDidMount(){
    this.digBulb = this.digBulb.bind(this);
    this.getTulip = this.getTulip.bind(this);
    this.getAllTulips();
    this.getBulbNumber();
    // this.interval = setInterval(() => this.getAllTulips(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDismiss = () => {
    setTimeout(() => {
          this.setState({ gotBulb: false })
        }, 0)
  }

  // Initialize the respective elements, state to indicate loading
  state = { activeItem: 'Market', num: 0, tulips: [], tulip: 0, loading: true, gardenView: true}

  async getBulbNumber(){
    this.setState ({loading: true})
    var num = await this.props.worldOfTulips.methods.getUnderGroundBulbNum().call();
    console.log(this.state.loading)
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
    if (this.state.tulips.length > 3){
      this.setState({gardenView: false});
    }
    this.setState({ loading: false });
  } 

  async digBulb(){
    this.setState ({loading: true});
    const gasAmount = await this.props.worldOfTulips.methods.digToFindBulb().estimateGas({from: this.props.userAccount});
    var bulbId = await this.props.worldOfTulips.methods.digToFindBulb().send({from: this.props.userAccount, gas: gasAmount});
    this.setState({ 
      loading: false,
      gotBulb: true     
    });
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
      var message = '';
      var gardenView = null;

      if (this.state.gardenView){
        gardenView = <GardenView {...this.props} tulips = {this.state.tulips} />;
      }

      if (this.state.gotBulb){
      message =
        <Message
          onDismiss={this.handleDismiss}
          success
          header='Congrats!'
          content='You found a tulip! It will be added to your collection.'
        />;}
    return <div>
    <div className='container' style={{'position': 'relative'}}>
      <p> {message} </p>
      <p> Overall Number of Bulbs: {this.state.num} </p>
      <Button className = 'right-button' onClick={this.digBulb} content='Dig for Tulip'/>
    </div>
    {this.state.loading ? ('Loading...') : (gardenView) } 
    <div>
    {this.state.loading ? ('Loading...') : (<TulipView {...this.props} tulips = {this.state.tulips}/>)} 
    </div>
    </div>

  }
}

export default GardenHome;

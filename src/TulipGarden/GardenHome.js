import React, { Component } from 'react'
import { Button, Message } from 'semantic-ui-react'
import TulipView from "./TulipView"
import '../css/tulip.css'
import Loader from "./Loader"

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
  }

  handleDismiss = () => {
    setTimeout(() => {
          this.setState({ gotBulb: false })
        }, 0)
  }

  // Initialize the respective elements, state to indicate loading
  state = { activeItem: 'Market', num: 0, tulips: [], tulipIDs: [], tulip: 0, loading: true, gardenView: true, colors: []}

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
    var tulipArray = [];
    for (var i = 0; i < ownedTulipIDs.length; i++) {
        const tulip = await this.getTulip(ownedTulipIDs[i]);
        tulipArray.push(tulip);
      };

    this.setState({
          tulips: tulipArray,
          tulipIDs: ownedTulipIDs
        });

    if (this.state.tulips.length > 3){
      this.setState({gardenView: false});
    }
    this.getAllColors()
    this.setState({ loading: false });
  } 

  getAllColors(){
    var colorArray = [];
    for (var i = 0; i < this.state.tulips.length ; i++){
      var temp = 'rgb(' + this.state.tulips[i].R + ',' + this.state.tulips[i].G + ',' + this.state.tulips[i].B + ')';
      colorArray.push(temp);
    };
    this.setState({
      colors: colorArray
    })
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
    this.getAllTulips();
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
    <div className='container' style={{'position': 'relative', padding: "40px 20px"}}>
      <p> {message} </p>
      <div style={{'float':'left'}}> Overall Number of Bulbs: {this.state.num} </div>
      <Button  color="brown" style={{'position': 'absolute', 'right':'30px'}} onClick={this.digBulb} content='Dig for Tulip'/>
    </div>
    {this.state.loading ? (<Loader/>) : (gardenView) } 
    <div>
    {this.state.loading ? null : (<TulipView {...this.props} tulips = {this.state.tulips} tulipIDs = {this.state.tulipIDs} colors = {this.state.colors}/>)} 
    </div>
    </div>

  }
}

export default GardenHome;

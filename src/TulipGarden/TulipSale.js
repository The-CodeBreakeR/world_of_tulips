import React, { Component } from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'

class TulipProfile extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			isOpen:false,
      price: 0,
      deadline: 0,
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createDaughterBulbs = this.createDaughterBulbs.bind(this);
	}

  show = () => this.setState({ isOpen: true })
	close = () => this.setState({ isOpen: false })

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(event){
    event.preventDefault();
    const gasAmount = await this.props.worldOfTulips.methods.submitRequest(this.props.id, this.state.price, this.state.deadline).estimateGas({from: this.props.userAccount});
    var requestID = await this.props.worldOfTulips.methods.submitRequest(this.props.id, this.state.price, this.state.deadline).send({from: this.props.userAccount, gas: gasAmount});
    this.close();
    console.log(requestID.events.RequestAdded.returnValues.requestID);
  }

  async createDaughterBulbs(id){
    const gasAmount = await this.props.worldOfTulips.methods.gatherDaughterBulbs(id).estimateGas({from: this.props.userAccount});
    var daughterBulbs = await this.props.worldOfTulips.methods.gatherDaughterBulbs(id).send({from: this.props.userAccount, gas: gasAmount});
  }

	render() {
		const {isOpen} = this.state;
        return <div>
         	<Button color="blue" onClick={this.show}>Sell Tulip</Button>
        			<Modal style={{'position':'relative', backgroundColor: "rgb(192,192,192,0.8)"}} size='mini' open={isOpen} onClose={this.close}>
                 		<Modal.Header style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>Sale Information</Modal.Header>
                  		<Modal.Content style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>
                        <form id='sell-form' className="ui form" onSubmit={this.handleSubmit}>
                          <div className="field">
                            <label>Tulip ID</label>
                            <input type="text" name="tulip-id" value={this.props.id}/>
                          </div>
                          <div className="field">
                            <label>Price</label>
                            <input type="text" name="price" placeholder = '1' required="required" onChange={this.handleChange}/>
                          </div>
                          <div className="field">
                            <label>Deadline</label>
                            <input type="text" name="deadline" placeholder = '100' required="required" onChange={this.handleChange}/>
                          </div>
                        </form>
                  		</Modal.Content>
                  		<Modal.Actions style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>
                  		<Button color='red' negative onClick={() => {
                                this.setState({isOpen: false})
                                }}> Cancel
                      </Button>
              				<Button color='green' positive form='sell-form'>
                				<Icon name='checkmark' /> Submit Request!
              				</Button>
                  		</Modal.Actions>
                	</Modal>
                  <Button onClick = {() => this.createDaughterBulbs(this.props.id)}> Generate daughter bulbs </Button>
        </div>
    }
} 

export default TulipProfile;

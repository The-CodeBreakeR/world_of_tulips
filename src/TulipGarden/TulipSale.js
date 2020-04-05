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

	render() {
		const {isOpen} = this.state
        return <div>
         	<Button onClick={this.show}>Sell Tulip</Button>
        			<Modal style={{'position':'relative'}}size='mini' open={isOpen} onClose={this.close}>
                 		<Modal.Header>Sale Information</Modal.Header>
                  		<Modal.Content>
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
                  		<Modal.Actions>
                  		<Button color='red' negative onClick={() => {
                                this.setState({isOpen: false})
                                }}> Cancel
                      </Button>
              				<Button color='green' positive form='sell-form'>
                				<Icon name='checkmark' /> Submit Request!
              				</Button>
                  		</Modal.Actions>
                	</Modal>
        </div>
    }
} 

export default TulipProfile;

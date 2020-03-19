import React, { Component } from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'


class TulipProfile extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			isOpen:false,
		};
	}

  show = () => this.setState({ isOpen: true })
	close = () => this.setState({ isOpen: false })


	render() {
		const {isOpen} = this.state

        return <div>
         	<Button onClick={this.show}>Show Info</Button>

			<Modal size='mini' open={isOpen} onClose={this.close}>
         		<Modal.Header>Tulip Information</Modal.Header>
          		<Modal.Content>
            		<p>Owner: {this.props.tulip.owner} </p>
            		<p>Generation: {this.props.tulip.generation} </p>
            		<p>Colors: {this.props.tulip.R, this.props.tulip.G, this.props.tulip.B } </p>
            		<p>Mother ID: {this.props.tulip.mother} </p>
          		</Modal.Content>
          		<Modal.Actions>

          			<Button color='blue'>
        				<Icon name='arrow alternate circle down' /> Show Daughter Bulbs
      				</Button>
      				<Button color='green' onClick={() => {
                        this.setState({isOpen: false})
                        }}>
        				<Icon name='checkmark' /> Got it!
      				</Button>
          		</Modal.Actions>
        	</Modal>
        </div>
    }
} 

export default TulipProfile;

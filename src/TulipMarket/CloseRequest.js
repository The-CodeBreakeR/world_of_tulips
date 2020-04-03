import React, { Component } from 'react'
import Tulipimage from './images/Tulip.jpg'
import { Grid, Card, Image,Button,Modal,Icon } from "semantic-ui-react"
import TulipProfileMarket from "./TulipProfileMarket"

//include image i array in Market Home myTulipsforSale in show info


class CloseRequest extends Component {
  
  
  constructor(props){
        super(props);
        this.state = {
          isOpen:false
          
        }
   
        this.closeThisRequest = this.closeThisRequest.bind(this)
  }

  show = () => this.setState({ isOpen: true })
	close = () => this.setState({ isOpen: false })


  // componentWillReceiveProps(nextProps){
  //   this.setState({totalTulip : nextProps.totalTulip})
  // }

  async closeThisRequest(id){
    
    const gasAmount = await this.props.worldOfTulips.methods.closeRequest(id).estimateGas({from:this.props.userAccount});
    await this.props.worldOfTulips.methods.closeRequest(id).send({from:this.props.userAccount, gas:gasAmount});
  }

      render() {
      
      
        
      const TulipList = (props) => (
      <Grid colums={3} divided>
      {this.props.totalTulip.map((Tulip) => (
        <Grid.Column width={5}>
          <TulipListItem {...Tulip} key={Tulip.tulipID} />
        </Grid.Column>
      ))}
      </Grid>
      );

       const {isOpen} = this.state


      const TulipListItem = ({ tulipID, price,deadline,reqId,generation,stage,motherID,plantingTime,R,G,B}) => (
      
       <Card.Group>
          <div className = "ui centered card">
          <Card color = "olive">
            <Card.Content>
              <Image src= {Tulipimage} />
              <Card.Header>
                Tulip ID: {tulipID}
              </Card.Header>
              <Card.Meta>
              </Card.Meta>
              <Card.Description>
                ReqID : {reqId} {"\n"}
                price: {price} ETH {"\n"}
                deadline: {deadline}day(s) {"\n"}
              </Card.Description>
              <Button basic color = 'red' onClick = {this.closeThisRequest(Number(reqId))}>
                CloseRequest
              </Button>
              <Button basic color = "yellow" onClick = {this.show}>
                Show Info 
              </Button>
            <Modal size='mini' open={isOpen} onClose={this.close}>
         		<Modal.Header>Tulip Information</Modal.Header>
          		<Modal.Content>
                <p>reqId: {reqId}</p>
            		<p>Generation: {generation} </p>
            		<p>Colors: {R, G, B } </p>
            		<p>Mother ID: {motherID} </p>
                <p>stage: {stage}</p>
                <p>plantingTime: {plantingTime}</p>
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
        

            </Card.Content>
          </Card>
          </div>
       </Card.Group>
      )

     

    return (
      <div>
        <h1> CloseRequest for your Tulips </h1>
        <div className="container-list">
          {/* <p>tulips for sale: {this.state.buyReqIDs}</p> */}
          <TulipList Tulips={this.props.totalTulip} />
                      </div>
                      </div>
    )
  }
}


export default CloseRequest;
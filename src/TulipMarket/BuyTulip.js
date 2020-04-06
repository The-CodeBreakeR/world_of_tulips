import React, { Component } from 'react'
import Tulipimage from './images/Tulip.jpg'
import { Grid, Card, Image,Button,Modal,Icon,Confirm } from "semantic-ui-react"
import Web3 from 'web3';



class BuyTulip extends Component {
  
  
  constructor(props){
        super(props);
        this.state = {
          isOpen:false,
          isOpenConfirm:false,
        }
   
        this.buyThisTulip = this.buyThisTulip.bind(this)
  }

  show = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  open = () => this.setState({isOpenConfirm:true})
  shut = () => this.setState({isOpenConfirm:false})
  

  async buyThisTulip(id,price){
    
    const gasAmount = await this.props.worldOfTulips.methods.buyTulip(id).estimateGas({from:this.props.userAccount});
    var TulipId = await this.props.worldOfTulips.methods.buyTulip(id, {from:this.props.userAccount, gas:gasAmount,value: Web3.utils.toWei(price,"ether") });
    console.log("Tulip Bought" +{TulipId})
  }

 //ask ali's help to handle confirm

      render() {
        
      const TulipList = (props) => (
      <Grid colums={3} divided>
      {this.props.totalTulipBuy.map((Tulip) => (
        <Grid.Column width={5}>
          <TulipListItem {...Tulip} key={Tulip.tulipID} />
        </Grid.Column>
      ))}
      </Grid>
      );

       const {isOpen} = this.state
       const {isOpenConfirm} = this.state


      const TulipListItem = ({owner, tulipID, price,deadline,reqId,generation,stage,motherID,plantingTime,R,G,B}) => (
      
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
                Owner: {owner} {"\n"}
                ReqID : {reqId} {"\n"}
                price: {price} ETH {"\n"}
                deadline: {deadline}day(s) {"\n"}
                Stage: {stage} {"\n"}
              </Card.Description>
              <Button basic color = 'green' onClick = {() =>this.buyThisTulip(Number(reqId),price)}>
                Buy This Tulip
              </Button>
              {/* <Confirm
                open = {this.state.isOpenConfirm}
                OnCancel = {this.shut}
                OnConfirm = {() => this.closeThisRequest(Number(reqId))}>
              </Confirm> */}
              <Button basic color = "yellow" onClick = {this.show}>
                Show Info 
              </Button>
            <Modal size='mini' open={isOpen} onClose={this.close}>
         		<Modal.Header>Tulip Information</Modal.Header>
          		<Modal.Content>
                <p>reqId: {reqId}</p>
            		<p>Generation: {generation} </p>
            		<p>R :{R}| G :{G} {"\n"}|B :{B} {"\n"} </p>
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
              <h1> Buy Tulips Around The World  </h1>
              <div className="container-list">
                <p>tulips for sale: {this.state.buyReqIDs}</p>
                <TulipList Tulips={this.props.totalTulipBuy} />
                            </div>
                            </div>
    )
  }
}


export default BuyTulip;
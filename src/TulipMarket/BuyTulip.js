import React, { Component } from 'react'
import { Grid, Card, Image,Button,Modal,Icon,Confirm } from "semantic-ui-react"
import Web3 from 'web3';
import {ReactComponent as TulipIcon} from '../img/tulip.svg';


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
     const gasAmount = await this.props.worldOfTulips.methods.buyTulip(id).estimateGas({from:this.props.userAccount, value:price});
     var tulipId = await this.props.worldOfTulips.methods.buyTulip(id).send({from:this.props.userAccount, gas:gasAmount, value:price });
  }

 //ask ali's help to handle confirm

      render() {
      const TulipIconGrid = (props) => { 
        if (this.props.colors){
            return (<TulipIcon fill={this.props.colors[props.i - 1]} width='250px' height='250px'/>);
          }else{
            return (null);
          }}

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
          <div className = "box">
          <Card color = "olive">
            <Card.Content>
              <TulipIconGrid i = {reqId} />>
              <Card.Header>
                Tulip ID: {tulipID}
              </Card.Header>
              <Card.Meta>
              </Card.Meta>
              <Card.Description>
                Owner: {owner} {"\n"}
                ReqID : {reqId} {"\n"}
                price: {price} wei {"\n"}
                deadline: {deadline}day(s) {"\n"}
                Stage: {stage} {"\n"}
              </Card.Description>
              <Button  color = 'green' onClick = {() =>this.buyThisTulip(Number(reqId),price)}>
                Buy This Tulip
              </Button>
              {/* <Confirm
                open = {this.state.isOpenConfirm}
                OnCancel = {this.shut}
                OnConfirm = {() => this.closeThisRequest(Number(reqId))}>
              </Confirm> */}
              <Button  color = "yellow" onClick = {this.show}>
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
          </div>
       </Card.Group>
      )

     

    return (
            <div>
              <h1 style={{display:'flex', justifyContent:"center", padding: "20px"}}> Buy Tulips Around The World  </h1>
              <p></p>
              <p></p>
              <p></p>
              <h3 style={{display:'flex', padding: "20px"}} > Total Tulips for sale: {this.props.totalTulipBuy.length}</h3>
              <div> { this.props.totalTulipBuy.length>0 ?(
              <div className="wrapper">
                
                <TulipList Tulips={this.props.totalTulipBuy} />
                            </div>)
                            :(<h2 style={{display:'flex', justifyContent:"center", padding: "20px"}}> No Tulips For Sale Yet :(</h2>)}

                            </div>
                            </div>
    )
  }
}


export default BuyTulip;
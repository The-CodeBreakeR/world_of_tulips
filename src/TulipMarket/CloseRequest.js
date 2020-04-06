import React, { Component } from 'react'
import { Grid, Card, Image,Button,Modal,Icon,Confirm } from "semantic-ui-react"
import {ReactComponent as TulipIcon} from '../img/tulip.svg';

//include image i array in Market Home myTulipsforSale in show info


class CloseRequest extends Component {
  
  
  constructor(props){
        super(props);
        this.state = {
          isOpen:false,
          isOpenConfirm:false,
          
        }
        this.closeThisRequest = this.closeThisRequest.bind(this)
  }

  show = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  // open = () => this.setState({isOpenConfirm:true})
  // shut = () => this.setState({isOpenConfirm:false})
  


  async closeThisRequest(id){
    
    const gasAmount = await this.props.worldOfTulips.methods.closeRequest(id).estimateGas({from:this.props.userAccount});
    await this.props.worldOfTulips.methods.closeRequest(id).send({from:this.props.userAccount, gas:gasAmount});
    console.log("thisiscalled")
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
      {this.props.totalTulip.map((Tulip) => (
        <Grid.Column width={5}>
          <TulipListItem {...Tulip} key={Tulip.tulipID} />
        </Grid.Column>
      ))}
      </Grid>
      );

       const {isOpen} = this.state
      //  const {isOpenConfirm} = this.state


      const TulipListItem = ({ tulipID, price,deadline,reqId,generation,stage,motherID,plantingTime,R,G,B}) => (
      
       <Card.Group>
          <div className = "ui centered card">
          <div className = "box">
          <Card color = "olive">
            <Card.Content>
              <TulipIconGrid i = {reqId} />
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
              <Button color = 'red' onClick = {() => this.closeThisRequest(Number(reqId))}>
                Close Request
              </Button>
              {/* <Confirm
                open = {this.state.isOpenConfirm}
                OnCancel = {this.shut}
                OnConfirm = {() => this.closeThisRequest(Number(reqId))}>
              </Confirm> */}
              <Button color = "yellow" onClick = {this.show}>
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

        <h1 style={{display:'flex', justifyContent:"center",padding: "20px"}}> CloseRequest for your Tulips </h1>
        <div>{ this.props.totalTulip.length > 0 ?(
        <div className="wrapper">
          {/* <p>tulips for sale: {this.state.buyReqIDs}</p> */}
          <TulipList Tulips={this.props.totalTulip} />
                      </div>
        ) : (<h3 style = {{display:'flex',padding: "20px",justifyContent:"center"}}>
          No Tulips sold yet. Try Selling Tulips First.
        </h3>
        )}
        </div>
                      </div>
    )
  }
}


export default CloseRequest;
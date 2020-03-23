import React, { Component } from 'react'
import Tulipimage from './images/Tulip.jpg'

import { Grid, Card, Image,Button,Modal,Icon } from "semantic-ui-react"
//include image in this array
// make this array in constructor
//get requestids from Ali's function


//ask ali for the branch changes




// async getBuyingRequestIDs(){
//    var  buyReqIDs = await this.props.worldOfTulips.methods.getOtherOpenRequestIDs({from:this.props.useraccount}).call();
//    this.setState({buyReqIDs:buyReqIDs}); 
// }

// var buyreqIds = [this.state.buyReqIDs];

// var buyReqIDs = [1,2,3]

// var requestSpecs = async id => {
//     await this.props.worldOfTulips.methods.getRequest(id).call();
// }

// const tulipsfForSale = async () => {
//     return Promise.all(buyReqIDs.map( id => requestSpecs(id)));
// }

// tulipsfForSale().then(data =>{
//   console.log(data)
// })

// how to have function from above create an arraybelow


const Tulips = [
  { TulipId: 1, price : 1,deadline:1},
  { TulipId: 2, price : 2,deadline:1},
  { TulipId: 3, price : 3,deadline:1},
  { TulipId: 4, price : 4,deadline:2},
];

// populate below array with get tulip

const tulip = [ { owner: "A", generation:0, mother:"No" },
                 { owner: "B", generation:1, mother:"X" },
                 { owner: "C", generation:2, mother:"Y" },
                 { owner: "D", generation:3, mother:"Z" }, 

]

const TulipList = (props) => (
  <Grid colums={3} divided>
    {props.Tulips.map((Tulip) => (
      <Grid.Column width={5}>
        <TulipListItem {...Tulip} key={Tulips.TulipId} />
      </Grid.Column>
    ))}
  </Grid>
);

const show = () => this.setState({ isOpen: true })
const close = () => this.setState({ isOpen: false })


const TulipListItem = ({ TulipId, price,deadline,owner }) => (
  <Card.Group>
    <Card color = "olive">
      <Card.Content>
        <Image src= {Tulipimage} />
        <Card.Header>
          {TulipId}
        </Card.Header>
        <Card.Meta>
        </Card.Meta>
        <Card.Description>
         owner: {owner} {"\n"}
         price: {price} ETH {"\n"}
         deadline: {deadline}day(s) {"\n"}
        </Card.Description>
        <Button basic color = 'green' onClick={() => {
                        this.setState({isAvailabletosell: false})
                        }}>
            Buy This Tulip
        </Button>
        <Button basic color = "yellow" onClick ={this.show}>
          Show Info 
        </Button>
      </Card.Content>
    </Card>
  </Card.Group>
)

class BuyTulip extends Component {
    constructor(props){
        super(props);
        //this.getBuyingRequestIDs = this.getBuyingRequestIDs.bind(this);
        this.state = {
            buyReqIDs : [],
            isOpen:false
        }

    }
    render() {
      const {isOpen} = this.state
    return (
      <div>
        <h1> Buy Tulips around the world</h1>
        <div className="container-list">
          <TulipList Tulips={Tulips} />
        </div>
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
    )
  }
}


export default BuyTulip;
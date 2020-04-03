import React, { Component } from 'react'
import Tulipimage from './images/Tulip.jpg'

import { Grid, Card, Image,Button,Modal,Icon } from "semantic-ui-react"
//include image in this array
// make this array in constructor
//get requestids from Ali's function


//ask ali for the branch changes




// how to have function from above create an arraybelow

const tulipsForSale = [
  { TulipId: 1, price : 1,deadline:1},
  { TulipId: 2, price : 2,deadline:1},
  { TulipId: 3, price : 3,deadline:1},
  { TulipId: 4, price : 4,deadline:2},
];

// populate below array with get tulip

const Tulips = [ { owner: "A", generation:0, mother:"No" },
                 { owner: "B", generation:1, mother:"X" },
                 { owner: "C", generation:2, mother:"Y" },
                 { owner: "D", generation:3, mother:"Z" }, 

]

// and make following array



const TulipList = (props) => (
  <Grid colums={3} divided>
    {props.Tulips.map((Tulip) => (
      <Grid.Column width={5}>
        <TulipListItem {...Tulip} key={tulipsForSale.TulipId} />
      </Grid.Column>
    ))}
  </Grid>
);



const TulipListItem = ({ TulipId, price,deadline,owner, generation }) => (
  <Card.Group>
    <div class = "ui centered card">
    <Card color = "olive">
      <Card.Content>
        <Image src= {Tulipimage} />
        <Card.Header>
          {TulipId}
        </Card.Header>
        <Card.Meta>
        </Card.Meta>
        <Card.Description>
         generation: {generation} {"\n"}
         owner: {owner} {"\n"}
         price: {price} ETH {"\n"}
         deadline: {deadline}day(s) {"\n"}
        </Card.Description>
        <Button basic color = 'green'>
            Buy This Tulip
        </Button>
        <Button basic color = "yellow" >
          Show Info 
        </Button>
      </Card.Content>
    </Card>
    </div>
  </Card.Group>
)

class BuyTulip extends Component {
    constructor(props){
        super(props);
        this.state = {
            buyReqIDs : [],
            isOpen:false,
            tulipsForSale:[],
            tulipInfo :[]
        }
        this.tulipsForPurchase()
    }

    show = () => this.setState({ isOpen: true })
    close = () => this.setState({ isOpen: false })


    async getBuyingRequestIDs(){

      var buyReqIDs = await this.props.worldOfTulips.methods.getOthersOpenRequestIDs(this.props.userAccount).call();
      this.setState({buyReqIDs:buyReqIDs});
      console.log(typeof(buyReqIDs))

    }

    //this funcition gives ID, price and deadline of the card  

    

     async tulipsForPurchase() {
      await this.getBuyingRequestIDs();
      var tulipsForPurchase =[];
      var tulipsForPurchase =  Promise.all(this.state.buyReqIDs.map(id => this.props.worldOfTulips.methods.getRequest(id).call()));
      this.setState({tulipsForPurchase:tulipsForPurchase})
      
      
      // var tulipIds = this.state.tulipsForPurchase.map(tulip => tulip[0])
      // console.log(tulipIds)

        
      // var tulipInfo = Promise.all(tulipIds.map(id => this.props.worldOfTulips.getTulip(id).call()));
      // this.setState({tulipInfo:tulipInfo});
       };

     
    

    // // tulipsfForSale().then(data =>{
    // //   console.log(data)
    // // })

    
    render() {
      const {isOpen} = this.state

    return (
      <div>
        <h1> Buy Tulips around the world</h1>
        <div className="container-list">
          <p>tulips for sale: {this.state.buyReqIDs}</p>
          <TulipList Tulips={tulipsForSale} />
        {/*</div>
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
                      </Modal>*/}
                      </div>
                      </div>
    )
  }
}


export default BuyTulip;
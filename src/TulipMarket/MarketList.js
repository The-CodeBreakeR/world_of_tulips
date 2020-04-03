import React, { Component } from 'react'
import { Form, Modal, Button, FormGroup } from 'semantic-ui-react'

// fill options with account owned Tulips




// const options = [
//     {key:1, text: "Tulip 1", value: "Tulip ID1"},
//     {key:2, text: "Tulip 2", value: "Tulip ID2"},
// ]


class MarketList extends Component {

    constructor(props){
        super(props);
        this.submitRequest = this.submitRequest.bind(this);
        this.state = { allOwnedTulips : [], options:[], value : "", price: null, 
        deadline: null, errormess: ""}       
        this.getOwnedTulipsIds()
        // this.loadOptions();
        this.changeHandler = this.changeHandler.bind(this)
        this.changeSelect = this.changeSelect.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        // this.confirmSubmit = this.confirmSubmit.bind(this)
        }
        
        // async componentWillMount(){
        //     await this.getOwnedTulipsIds()
        // }
         componentDidMount() {

        this.watchEvents()
        }
      
        watchEvents(){

          this.props.worldOfTulips.events.RequestAdded({
            filter:{_user: this.props.userAccount}
              },{
                  fromBlock:0,
                  toBlock:"latest"
                 },function(error, event){ console.log(event)}).on('data',function(event){
                  console.log(event);
                })
        }

        async getOwnedTulipsIds(){
            // const gasAmount = await this.props.worldOfTulips.methods.getAllOwnedTulipIDs(this.props.userAccount).estimateGas({from: this.props.userAccount});
            var allOwnedTulips = await this.props.worldOfTulips.methods.getAllOwnedTulipIDs(this.props.userAccount).call();
            this.setState({allOwnedTulips:allOwnedTulips});
            console.log(this.state.allOwnedTulips)
            
            var arr = this.state.allOwnedTulips.length;
            var i;
            var options=[];
            for(i = 1; i < arr+1; i++) {
                options.push({key:i, text:"Tulip "+ i, value: i})
           }
           this.setState({options:options})
           console.log(options)
        }

        

        // key: this.state.allOwnedTulips(i), text: this.stat
        
       
        


        // fill my tulips with the Tulip ID's of the owner
    
     async submitRequest(value,price,deadline){
     const gasAmount = await this.props.worldOfTulips.methods.submitRequest(value,price,deadline).estimateGas({from: this.props.userAccount});
     var requestIdentifier = await this.props.worldOfTulips.methods.submitRequest(value,price,deadline).send({from: this.props.userAccount, gas: gasAmount});
     return requestIdentifier;
    }
  

   
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = "";
        if (nam === "price" || "deadline") {
            if(val !="" && !Number(val)) {
                err= <strong>Price and Deadline should be in number</strong>;
            }
        }
        this.setState({errormess: err});
        this.setState({[nam]: val});
    }
    

    changeSelect = (e, {value}) => this.setState({value})
    

    submitHandler = (event) => {
        event.preventDefault();
        alert("You are putting" + this.state.value + " Tulip on sale for " +this.state.price +" until " + this.state.deadline)
        console.log("value is "+ this.state.value);
        this.submitRequest(this.state.value,this.state.price,this.state.deadline);
    }
    



    render() {
        return (
        <div>    
            <Form onSubmit = {this.submitHandler}>

                
                <Form.Group widths = "equal">

                    {/*confirm input*/}
                    <Form.Input fluid label='Price' placeholder='Selling price in ETH' name = "price" onChange = {this.changeHandler}/>
                    <Form.Input fluid label='Deadline' placeholder="Deadline in days" name = "deadline" onChange  = {this.changeHandler} />
                    <Form.Select
                     name = "value"
                     onChange = {this.changeSelect}   
                     fluid
                     label='Select Tulip'
                     options = {(this.state.options)}
                     placeholder='Select Tulip'
                    />
                </Form.Group>
                <Form.Button type = "submit" >Sell MyTulip</Form.Button>
                {this.state.errormess}
                
                <p>The current Tulip:{this.state.value} is at price {this.state.price} ETH</p>
            
            </Form>
             






            
            

        </div>
        )
    }
}

export default MarketList;

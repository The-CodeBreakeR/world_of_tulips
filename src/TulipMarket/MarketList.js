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
        this.loadTulips();
        //this.submitRequest = this.sumbitRequest.bind(this);
        this.state = { tulips = [], value : "", price: null, deadline: null, errormess: ""}
        }
    

    // fill my tulips with the Tulip ID's of the owner
    
    //   async submitRequest(tulipId, price, deadline){
    //     const gasAmount = await this.props.worldofTulips.methods.submitRequest(tulipId,price,deadline).estimateGas({from: this.props.userAccount});
    //     var requestIdentifier = await this.props.worldofTulips.methods.submitRequest(tulipId,price,deadline).send({from: this.props.userAccount, gas: gasAmount});
    // }
  

   
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
                     options={options}
                     placeholder='Select Tulip'
                    />
                </Form.Group>
                <Form.Button type = "submit" >Sell MyTulip</Form.Button>
                {this.state.errormess}
                
                <p>The current Tulip  is  {this.state.value} at price {this.state.price} </p>
            
            </Form>
             <p>{JSON.stringify(this.state,null,2)}</p>




            
            

        </div>
        )
    }
}

export default MarketList;

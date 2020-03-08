import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { LIBRARY_ADDRESS, LIBRARY_ABI } from './config'

class App extends Component {

  async loadBlockchainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    var library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS);
    const inventorySize = await library.methods.getInventorySize().call();
    this.setState({ admin : accounts[0]});
    this.setState({ books : library.bookInventory});
    this.setState({ inventorySize : inventorySize});
    this.setState({ library });
    this.setState({ account: accounts[0] });
    this.setState({ balance: balance});
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      balance: 0,
      inventorySize: 0,
      admin: '',
      title: '',
      author: '',
      books : []
    };
    this.loadBlockchainData();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleSubmit(event) {
    this.addBook();
    var updatedInventory = await this.state.library.methods.getInventorySize().call();
    this.state.inventorySize = updatedInventory;
    event.preventDefault();
  }

  async addBook(){
    await this.state.library.methods.newBookInInventory(this.state.title, this.state.author).send({from: this.state.admin, gas: 4712388});
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <p>Your balance: {this.state.balance}</p>
        <p>inventorySize: {this.state.inventorySize}</p>

        <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>
              <input id="title" type="text" name="title" onChange={this.handleChange} className="form-control" placeholder="Sample Title" required />
              <input id="author" type="text" name="author" onChange={this.handleChange2} className="form-control" placeholder="Sample Author" required />
              <input type="submit" value="Submit" hidden="" />
          </form>
        </div>  
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Web3 from 'web3'


class LoggedOutHome extends Component {

    async handleClick() {
        var web3;
        if(this.props.gateway === 'METAMASK') {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if(this.props.gateway === 'GANACHE') {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        }
        var accounts = await web3.eth.getAccounts();
        // Connect to the deployed smart contract
        var smartContract = await new web3.eth.Contract(this.props.contractAbi, this.props.contractAddress);
        this.props.logIn(smartContract, accounts[0]);
    }

    render() {
        return <div>
            <Button onClick={() => this.handleClick()}>
                Log In
            </Button>
        </div>
    }
}

export default LoggedOutHome;

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
        this.props.logIn(accounts[0]);
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

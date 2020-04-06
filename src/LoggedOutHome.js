import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Web3 from 'web3'
import './css/login.css'

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
        console.log(accounts);
        // Connect to the deployed smart contract
        var smartContract = await new web3.eth.Contract(this.props.contractAbi, this.props.contractAddress);
        this.props.logIn(smartContract, accounts[0]);
    }

    render() {
        return <div id="doorBox" class="door-box">
            <div class="wall">
                <div class="door-border">
                    <div class="door-frame">
                        <div id="door" class="door">
                            <div id="light" hidden=""></div>
                            <div class="door-face-0"></div>
                            <div class="door-face-2"></div>
                            <div class="door-face-1">
                                <div class="door-card">Welcome to the World of Tulips!
                                    <img src={require("./img/tulip_head_colour.png")} align="middle" width="50" height="50" position="relative"/>
                                </div>
    	                        <div class="door-btn">
                                    <Button className="door-in" color='yellow' onClick={() => this.handleClick()}>
                                        Log In
                                    </Button>
                                </div>
                            </div>
                            <div class="door-face-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default LoggedOutHome;

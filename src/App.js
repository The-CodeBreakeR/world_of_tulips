import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { GATEWAY, CONTRACT_ADDRESS, WORLD_OF_TULIPS_ABI } from './config'
import LoggedOutHome from './LoggedOutHome'
import LoggedInHome from './LoggedInHome'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gateway: GATEWAY,
            contractAddress: CONTRACT_ADDRESS,
            contractAbi: WORLD_OF_TULIPS_ABI,
            loggedIn: false,
            userAccount: '',
            appModalOpen: false,
            worldOfTulips: null
        };
    }

    render() {
        return (!this.state.loggedIn)
        ? <LoggedOutHome
            gateway={this.state.gateway}
            contractAddress={this.state.contractAddress}
            contractAbi={this.state.contractAbi}
            logIn={(smartContract, account) => this.setState({
                loggedIn: true,
                userAccount: account,
                worldOfTulips: smartContract,
                appModalOpen: true
            })}
            // setContract={smartContract => this.setState({
            //     worldOfTulips: smartContract
            // })}
        />
        : <div >
            <LoggedInHome
                {...this.state}
                logOut={() => this.setState({
                    loggedIn: false,
                    userAccount: '',
                    worldOfTulips: null
                })}
            />
            <Modal   size='tiny'
                open={this.state.appModalOpen}
                onClose={() => this.setState({appModalOpen: false})}
                onOpen={() => this.setState({appModalOpen: true})}
                style={{ backgroundColor: "rgb(192,192,192,0.8)",'position': 'relative'}}
            >
                <Modal.Header style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>Logged In Successfully!</Modal.Header>
                <Modal.Content style={{ backgroundColor: "rgb(192,192,192,0.8)"}} >
                    <Modal.Description>
                        Account: {this.state.userAccount}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions style={{ backgroundColor: "rgb(192,192,192,0.8)"}}>
                    <Button color='green'
                        onClick={() => {
                        this.setState({appModalOpen: false})
                        }}>
                        Ok!
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    }
}

export default App;

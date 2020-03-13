import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { GATEWAY, CONTRACT_ADDRESS, WORLD_OF_TULIPS_ABI } from './config'
import LoggedOutHome from './LoggedOutHome'
import LoggedInHome from './LoggedInHome'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gateway: GATEWAY,
            contractAddress: CONTRACT_ADDRESS,
            loggedIn: false,
            userAccount: ''
        };
    }

    render() {
        return (!this.state.loggedIn)
        ? <LoggedOutHome
            gateway={this.state.gateway}
            logIn={account => this.setState({
                loggedIn: true,
                userAccount: account,
            })}
        />
        : <div>
            <LoggedInHome
                {...this.state}
                logOut={() => this.setState({
                    loggedIn: false,
                    userAccount: ''
                })}
            />
        </div>
    }
}

export default App;

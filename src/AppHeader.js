import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import logoutbutton from './css/buttons.css'
import './css/pageheader.css'

class AppHeader extends Component {

    render() {
        return <div className="pageheader">
            <p>Account: {this.props.userAccount}</p>
            <Button color='red'   className="logoutbutton"  onClick={() => this.props.logOut()}>
             LOG OUT
            </Button>
        </div>
    }
}

export default AppHeader;

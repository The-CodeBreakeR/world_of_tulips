import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


class AppHeader extends Component {

    render() {
        return <div>
            <p>Account: {this.props.userAccount}</p>
            <Button onClick={() => this.props.logOut()}>
                Log Out
            </Button>
        </div>
    }
}

export default AppHeader;

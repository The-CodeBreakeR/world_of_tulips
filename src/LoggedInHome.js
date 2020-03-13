import React, { Component } from 'react'


class LoggedInHome extends Component {

    render() {
        return <div>
            <p>Account: {this.props.userAccount}</p>
        </div>
    }
}

export default LoggedInHome;

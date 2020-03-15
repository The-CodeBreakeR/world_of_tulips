import React, { Component } from 'react'
import AppHeader from './AppHeader'
import AppMenu from './AppMenu'
import AppFooter from './AppFooter'

class LoggedInHome extends Component {

    render() {
        return <div className='app'>
            <AppHeader {...this.props}/>
            <AppMenu {...this.props}/>
            <AppFooter {...this.props}/>
        </div>
    }
}

export default LoggedInHome;

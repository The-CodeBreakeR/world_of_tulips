import React, { Component } from 'react'
import MarketHome from './TulipMarket/MarketHome'
import GardenHome from './TulipGarden/GardenHome'


class AppBody extends Component {

    render() {
        return (this.props.activeItem === 'Market')
        ? <MarketHome {...this.props}/>
        : <GardenHome {...this.props}/>
    }
}

export default AppBody;

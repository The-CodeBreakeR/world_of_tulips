import React, { Component } from 'react'
import MarketList from "./MarketList"


class MarketHome extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div>
            <p>This is the home to Tulip Market. Everything you need is in props, connect to contracts here.</p>
            <MarketList {...this.props}/>
        </div>
    }
}

export default MarketHome;


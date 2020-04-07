import React, { Component } from 'react'
import logo from './logo.jpeg';
import { Button } from 'semantic-ui-react'
import footerlocation from './css/footerlocation.css'
import letterlocation from './css/letterlocation.css'

class AppFooter extends Component {

    render() {
        return <div>
            <img className='footerlocation' src={logo}  width={100} height={100} alt='logo' />
            <Button color='green' className="letterlocation"active>Tulip Mania&copy;2020</Button>
                
            
        </div>
    }
}

export default AppFooter;

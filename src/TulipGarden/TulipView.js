import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import TulipProfile from "./TulipProfile"
import '../css/tulip.css'
import {ReactComponent as Icon} from '../img/tulip.svg';


class TulipView extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		const TulipIcon = () => { return (
        	<Icon fill={'purple'} width='50px' height='50px'/>
        );
    };
		return <div>
			<table className="table">
		        <thead id="tulipList">
		          <tr>
		            <th scope="col">ID</th>
		            <th scope="col">Tulip</th>
		            <th scope="col">Tulip Generation</th>
		            <th scope="col">Tulip Info</th>
		          </tr> 
		        </thead>
			        <tbody id="tulipList">
			            {this.props.tulips.map((tulip, key)=>{
			                return(
			                    <tr key={key}>
			                    <td>{key+1}</td>
			                    <td><TulipIcon/></td>
			                    <td>{tulip.generation}</td>
			                    <td><TulipProfile tulip = {tulip}/></td>      
			             	    </tr>
			                )
			            })}
			         </tbody>
       			</table>
		</div>
	}
}

export default TulipView;
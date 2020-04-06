import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import TulipSale from "./TulipSale"
import '../css/tulip.css'
import {ReactComponent as Icon} from '../img/tulip.svg';


class TulipView extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		const TulipIcon = (props) => { 
						return (
        	<Icon fill={this.props.colors[props.i]} width='50px' height='50px'/>
        	);
   		 };

		return <div>
		<div className="container">
			<table className="table" style={{"text-align":"center"}}>
		        <thead id="tulipList">
		          <tr>
		            <th scope="col">ID</th>
		            <th scope="col">Tulip</th>
		            <th scope="col">Tulip Generation</th>
		            <th scope="col">Action</th>
		          </tr> 
		        </thead>
			        <tbody id="tulipList">
			            {this.props.tulips.map((tulip, key)=>{
			                return(
			                    <tr key={key}>
			                    <td>{this.props.tulipIDs[key]}</td>
			                    <td><TulipIcon i = {key}/></td>
			                    <td>{tulip.generation}</td>
			                    <td><TulipSale {...this.props} tulip = {tulip} id = {this.props.tulipIDs[key]}/></td>      
			             	    </tr>
			                )
			            })}
			         </tbody>
       			</table>
       		</div>
		</div>
	}
}

export default TulipView;
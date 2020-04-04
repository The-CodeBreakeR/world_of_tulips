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
		var colors = ['rgb(254, 136, 26)', 'rgb(254, 195, 213)',  'rgb(252, 235, 3)']
		const TulipIcon = (props) => { 
						console.log(colors[props.i]);
						return (
        	<Icon fill={colors[props.i]} width='50px' height='50px'/>
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
			                    <td>{key+1}</td>
			                    <td><TulipIcon i = {key}/></td>
			                    <td>{tulip.generation}</td>
			                    <td><TulipSale {...this.props} tulip = {tulip} id = {key+1}/></td>      
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
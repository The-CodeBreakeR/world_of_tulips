import React, { Component } from 'react'
import { Modal, Icon, Button } from 'semantic-ui-react'
import TulipProfile from "./TulipProfile"


class TulipView extends Component{
	
	constructor(props){
		super(props);
		console.log(this.props.tulips);
	}

	render(){

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
			                    <td><img src={require('../img/tulip_placeholder.png')} width='50px' height='50px'/></td>
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
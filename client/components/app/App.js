import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'

let App = new React.createClass({

	render(){
		const children = this.props.children
		return (
			<div>
				<NavBar />

	        	{this.props.children}	
        	</div>		
		)
	}
});

export default App
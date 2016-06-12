import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import { connect } from 'react-redux' 

let App = new React.createClass({

	render(){

		return (
			<div>
				<NavBar />

	        	{this.props.children}	
        	</div>		
		)
	}
});

export default App
import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import { connect } from 'react-redux' 

let App = new React.createClass({

	componentDidMount(){
		const { dispatch } = this.props
		//console.log('dispatch from App : ' + JSON.stringify(dispatch))
	},

	render(){

		return (
			<div>
				<NavBar />

	        	{this.props.children}	
        	</div>		
		)
	}
});

function mapStateToProps(state, props){
	const { dispatch } = state
	//console.log('state')
	//console.log(Object.keys(props))
	return { 
		
	}
}

App = connect(mapStateToProps)(App)

export default App
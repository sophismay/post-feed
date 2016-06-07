import React, { Component } from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth  from '../../auth/auth'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { storeToken, registerUser } from '../../redux/actions'
import * as actionCreators from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap'

const url = '/api/users'

let Register = new React.createClass({

	componentDidMount(){
		//console.log('Register did mount: ' + JSON.stringify(this.props.token))
	},


	handleSubmit(data) {
		this.setState({
			type: 'info',
			message: 'Sending info ...'
		});

		registerUser(data)(store.dispatch).then( () => {
			browserHistory.push('/home')
		})
			
	},

	handleEmailChange: function(e) {
    	this.setState({email: e.target.value});
  	},

  	handlePasswordChange: function(e) {
    	this.setState({password: e.target.value});
  	},

  	enableButton() {
  		this.setState({ canSubmit: true });
  	},

  	disableButton() {
  		this.setState({ canSubmit: false });
  	},

	getInitialState(){
		return {
			loggedIn: Auth.loggedIn(),
			email: '',
			password: '',
			name: '',
			canSubmit: false
		}
	},

	updateAuth(loggedIn){
    	this.setState({
      		loggedIn: loggedIn
    	})
  	},

	componentWillMount() {
  
  	},

	render() {
		if (this.state.type && this.state.message) {
    		var classString = 'alert alert-' + this.state.type;
    		var status = <div id="status" className={classString} ref="status">
                   {this.state.message}
                 </div>;
  		}
		return (
			<div className='container'>
				<Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="register">
					<Input type='text' name='name' className='form-control' 
						placeholder='Full Name' value={this.state.name} title='Name'
						required/>

					<Input type='text' name='email' className='form-control' 
						placeholder='Email' value={this.state.email} title='Email'
						validations="isEmail" validationError="This is not a valid email" 
						required/>
					<p/>
					<Input type='password' name='password' className='form-control' 
						placeholder='Password' value={this.state.password} title='Password'
						required/>
					<p/>
					<Button type="submit" disabled={!this.state.canSubmit} >Register</Button>	
					{status} 
					<p/>
					<Link to='/login'>Login</Link>
				</Form>
			</div>
		)
	}
});

function mapStateToProps(state, props){
	const { auth, mainReducer } = state
	const { isFetching, isAuthenticated } = auth
	const { token, loggedIn } = mainReducer

	return {
		isFetching,
		isAuthenticated,
		loggedIn,
		token
	}
}

function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

Register = connect(mapStateToProps, mapDispatchToProps)(Register)

export default Register
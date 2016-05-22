import React, { Component } from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth  from '../../auth/auth'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { storeToken } from '../../redux/actions'
import * as actionCreators from '../../redux/actions'
import { bindActionCreators } from 'redux'

let Login = new React.createClass({

	handleSubmit(e){
		e.preventDefault()

		this.setState({
			type: 'info',
			message: 'Sending info ...'
		});
		// fetch form data
		let formData = {
			email: this.state.email.trim(),
			password: this.state.password.trim()
		};

		//TODO: better validation
		if(formData.email === '' || formData.password === ''){
			this.setState({type: 'error', message: 'Validation Error'});
			return;
		}
		console.log('consoling form data: ' + JSON.stringify(formData));

		Auth.login(formData, (err, res) => {
			if(err || !res){
				//TODO: handle error
				// clear form fields and set error message
				this.setState({
					email: '',
					password: '',
					type: 'error',
					message: 'Invalid email or password'
				});
			} else {
				// store token and redirect user
				store.dispatch(storeToken(res.token))
				this.setState({ loggedIn: true })

				const { location } = this.props

				if (location.state && location.state.nextPathname) {
					browserHistory.push(location.state.nextPathname)
				} else {
					browserHistory.push('/home')
				}
			}
		});

	},

	handleEmailChange: function(e) {
    	this.setState({email: e.target.value});
  	},

  	handlePasswordChange: function(e) {
    	this.setState({password: e.target.value});
  	},

  	getInitialState(){
		return {
			loggedIn: Auth.loggedIn()
		}
	},

	render(){
		// redirect home if already logged in
		if(Auth.loggedIn()){
			browserHistory.push('/home')
		}
		// messages
		if (this.state.type && this.state.message) {
    		var classString = 'alert alert-' + this.state.type;
    		var status = <div id="status" className={classString} ref="status">
                   {this.state.message}
                 </div>;
  		}
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='email' className='form-control' 
						placeholder='Email' value={this.state.email} 
						onChange={this.handleEmailChange} required/>
					<p/>
					<input type='password' name='password' className='form-control' 
						placeholder='Password' value={this.state.password} 
						onChange={this.handlePasswordChange} required/>
					<p/>
					<button >Log In</button>	
					
					{status} 
					
				</form>
			</div>
		)
	}
});

function mapStateToProps(state){
	return { token: state.token }
}

function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Login
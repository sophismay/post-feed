import React, { Component } from 'react'
//import { RouterContext } from 'react-router'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth  from '../../auth/auth'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { storeToken } from '../../redux/actions'
import * as actionCreators from '../../redux/actions'
import { bindActionCreators } from 'redux'

const url = '/api/users'

let Register = new React.createClass({


	handleSubmit(e) {
		e.preventDefault();

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

		Auth.register(formData, (err, res) => {
			if(err || !res){
				//TODO: handle error
			} else{
				// TODO: use redux store to store token
				// tell store a token action has taken place
				store.dispatch(storeToken(res.token));

				console.log('context: ' + JSON.stringify(Object.keys(this.context)));
				console.log('props: ' + JSON.stringify(this.props));

				this.setState({
					loggedIn: true
				});
				const { location } = this.props

				if (location.state && location.state.nextPathname) {
					browserHistory.push(location.state.nextPathname)
					//this.context.transitionTo(location.state.nextPathname)
				} else {
					browserHistory.push('/home')
					//this.props.router.replace('/home')
					//this.context.transitionTo('home')
				}
				// reroute to Home page
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
		return{
			loggedIn: Auth.loggedIn(),
			email: '',
			password: ''
		}
	},

	updateAuth(loggedIn){
    	this.setState({
      		loggedIn: loggedIn
    	})
  	},

	componentWillMount() {
    	//Auth.onChange = this.updateAuth
    	Auth.login()
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
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='email' className='form-control' 
						placeholder='Email' value={this.state.email} 
						onChange={this.handleEmailChange} required/>
					<p/>
					<input type='password' name='password' className='form-control' 
						placeholder='Password' value={this.state.password} 
						onChange={this.handlePasswordChange} required/>
					<p/>
					<button >Register</button>	
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

Register = connect(mapStateToProps, mapDispatchToProps)(Register)

export default Register
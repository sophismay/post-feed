import React, { Component } from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth  from '../../auth/auth'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { storeToken, setLoggedIn, receiveLogin } from '../../redux/actions'
import * as actionCreators from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap'

let Login = new React.createClass({

	handleSubmit(data){
		//e.preventDefault()
		console.log('e arg in handle: ' + JSON.stringify(data));
		this.setState({
			type: 'info',
			message: 'Sending info ...'
		});

		Auth.login(data, (err, res) => {
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
				// TODO: clear form fields?
				// store token and redirect user
				//console.log('props store state before successful login: ' + JSON.stringify(this.props.state))
				store.dispatch(storeToken(res.body.token))
				
				// for auth, in the end, will use just one
				store.dispatch(setLoggedIn(true))
				store.dispatch(receiveLogin(res.body))
				localStorage.setItem('user', res.body)
				localStorage.setItem('token', res.body.token)
				console.log('localStorage: ' + JSON.stringify(localStorage))

				const { location } = this.props

				if (location.state && location.state.nextPathname) {
					console.log('using next pathname: ' + location.state.nextPathname)
					browserHistory.push(location.state.nextPathname)
				} else {
					console.log('using home')
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

  	enableButton() {
  		this.setState({ canSubmit: true });
  	},

  	disableButton() {
  		this.setState({ canSubmit: false });
  	},

  	getInitialState(){
		return {
			loggedIn: Auth.loggedIn(),
			canSubmit: false
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
				<Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
					<Input type='text' name='email' className='form-control' 
						placeholder='Email' value={this.state.email} title='Email'
						validations="isEmail" validationError="This is not a valid email" required/>
					<p/>
					<Input type='password' name='password' className='form-control' 
						placeholder='Password' value={this.state.password} title='Password'
						required/>

					{status} 
						
					<p/>
					<Button type="submit" disabled={!this.state.canSubmit}>Log In</Button>	

					<p/>
					<Link to='/register'>Register</Link>
				</Form>
			</div>
		)
	}
});

function mapStateToProps(state, props){
	return { 
		token: state.token,
		state: state,
		propsStore: props.store
	}
}

function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Login
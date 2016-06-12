import React, { Component } from 'react'
import store from '../../redux/store'
import { createPost } from '../../redux/actions'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

let PostForm = new React.createClass({

	handleSubmit(data){
		console.log('data from post form: ' + JSON.stringify(data))
		this.setState({
			type: 'info',
			message: 'Sending info ...'
		});
		let dispatch = store.dispatch
		dispatch(createPost(data))
			.then( () => { browserHistory.push('/home') })
	},

	enableButton() {
  		this.setState({ canSubmit: true });
  	},

  	disableButton() {
  		this.setState({ canSubmit: false });
  	},

	getInitialState(){
		return {
			text: '',
			type: '',
			message: '',
			canSubmit: false
		}
	},
	
	render(){
		return (
			<div className='container'>
				<Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="">
					<Input type='textarea' name='text' className='form-control' componentClass='textarea'
						placeholder='What"s on your mind' value={this.state.text} title='Text'
						required/>
					<p/>
					<Button type="submit" disabled={!this.state.canSubmit} >Post</Button>	
					{status} 
				</Form>
			</div>
		)
	}
})

export default PostForm
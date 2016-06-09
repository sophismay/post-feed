import React, { Component } from 'react'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap' 

let CommentForm = new React.createClass({

	handleSubmit(data){	
		dispatch()
	},

	enableButton() {
  		this.setState({ canSubmit: true });
  	},

  	disableButton() {
  		this.setState({ canSubmit: false });
  	},

	getInitialState(){
		return {
			comment: '',
			status: '',
			canSubmit: false
		}
	},

	componentDidMount(){
		let dispatch = this.props.store.dispatch
	},

	render(){
		return (
			<div>
				<Form inline onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="">
					<Input type='text' name='comment' className='form-control' withoutLabel='true'
						placeholder='Reply' value={this.state.comment} title='Comment' bsSize='small'
						required/>
					<Button type="submit" disabled={!this.state.canSubmit} >Post</Button>	
					
				</Form>
			</div>
		)
	}
})

export default CommentForm
import React, { Component } from 'react'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap' 
import { commentPost } from '../../redux/actions'
import store from '../../redux/store'

let CommentForm = new React.createClass({

	handleSubmit(data){
		this.props.onCommentSubmit(data, this.props.postId)
		this.setState({comment: undefined})
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
		//let dispatch = this.props.store.dispatch
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
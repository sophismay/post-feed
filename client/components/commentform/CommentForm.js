import React, { Component } from 'react'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap' 
import { commentPost } from '../../redux/actions'
import store from '../../redux/store'

let CommentForm = new React.createClass({

	handleSubmit(data){	
		data.postId = this.props.postId
		console.log('post id from comment form: ' + data.postId)
		let dispatch = store.dispatch
		dispatch(commentPost(data))
			.then( (post) => {
				if(post.hasOwnProperty('error')){
					//TODO: handle error
					alert('error replying to post')
				}else{
					console.log('returned post from call: ' + JSON.stringify(post))
					this.setState({post: post})	
					// TODO: update comments in view
				}
				
			})
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
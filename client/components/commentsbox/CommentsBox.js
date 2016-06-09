import React, { Component } from 'react'
import CommentForm from '../commentform/CommentForm'

let CommentsBox = new React.createClass({
	
	getInitialState(){
		return {

		}
	},

	render(){
		return (
			<div>
				<CommentForm />
			</div>
		)
	}
})

export default CommentsBox
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
				<CommentForm postId={this.props.postId} />
				{ this.props.comments.map( comment => {
					return <div><span> <b>{comment.name}</b> {comment.comment} </span></div>
				})}
			</div>
		)
	}
})

export default CommentsBox
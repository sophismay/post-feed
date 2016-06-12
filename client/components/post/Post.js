import React, { Component } from 'react'
import CommentsBox from '../commentsbox/CommentsBox'

let Post = new React.createClass({
	render(){
		let post = this.props.post
		return (
			<div className='post-container'>
				<h5><b>{ post.name }</b> </h5>
				<p/>
				<h5> { post.text } </h5>
				<p/>
				<CommentsBox postId={post._id} comments={post.comments} 
					onCommentSubmit={this.props.onCommentSubmit}/>
			</div>
		)
	}
});

export default Post
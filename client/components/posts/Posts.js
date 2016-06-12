import React, { Component } from 'react'
import Post from '../post/Post'
import store from '../../redux/store'
import { fetchPosts, commentPost } from '../../redux/actions'
import { browserHistory } from 'react-router'

let Posts = new React.createClass({

	handleCommentSubmit(data, postId){
		// TODO: make post comment request, receive post and update list of posts
		console.log('submit called from Posts: ', data)
		data.postId = postId
		console.log('post id from comment form: ' + data.postId)
		let dispatch = store.dispatch
		dispatch(commentPost(data))
			.then( (updatedPost) => {
				if(updatedPost.hasOwnProperty('error')){
					//TODO: handle error
					alert('error replying to post')
				}else{
					console.log('returned post from call: ' + JSON.stringify(updatedPost))
					
					// TODO: update comments in view
					let newPosts = this.state.posts.map( post => {
						if(post._id != updatedPost._id)
							return post 
						else
							return updatedPost
							
					})
					console.log('new posts after mapping ', newPosts)
					
					this.setState({
						posts: newPosts
					})
				}
				
			})
	},

	getInitialState(){
		return {
			posts: []
		}
	},

	componentDidMount(){
		let dispatch = store.dispatch
		dispatch(fetchPosts())
			.then( (posts) => {
				console.log('inside callback: ' + JSON.stringify(posts))
				this.setState({
					posts: posts
				})
			})
		console.log('store state after fetchPosts: ' + JSON.stringify(store.getState()))
	},

	componentWillUnmount(){

	},

	render(){
		return (
			<div className='container'>
				{ this.state.posts.map( post => {
					return <Post key={post._id} post={post} 
						onCommentSubmit={this.handleCommentSubmit} />
				}) }
			</div>
			
		)
	}
});

export default Posts
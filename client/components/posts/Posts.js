import React, { Component } from 'react'
import Post from '../post/Post'
import store from '../../redux/store'
import { fetchPosts, commentPost } from '../../redux/actions'
import { browserHistory } from 'react-router'

let Posts = new React.createClass({

	handleCommentSubmit(){
		// TODO: make post comment request, receive post and update list of posts

	},

	getInitialState(){
		return {
			posts: []
		}
	},

	componentDidMount(){
		store.dispatch(fetchPosts())
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
					return <Post key={post._id} post={post}/>
				}) }
			</div>
			
		)
	}
});

export default Posts
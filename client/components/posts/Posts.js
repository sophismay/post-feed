import React, { Component } from 'react'
import Post from '../post/Post'
import store from '../../redux/store'
import { fetchPosts } from '../../redux/actions'
import { browserHistory } from 'react-router'

let Posts = new React.createClass({

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
					return <Post key={post._id} n={post.author} t={post.text} />
				}) }
			</div>
			
		)
	}
});

export default Posts
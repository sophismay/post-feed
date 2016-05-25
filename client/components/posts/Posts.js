import React, { Component } from 'react'
import Post from '../post/Post'
import store from '../../redux/store'
import { fetchPosts } from '../../redux/actions'

let Posts = new React.createClass({

	getInitialState(){
		return {
			posts: [{
				id: 1,
				text: 'Some text here',
				name: 'user one'
			},
			{
				id: 2,
				text: 'Another text here',
				name: 'user two'
			}]
		}
	},

	componentDidMount(){
		store.dispatch(fetchPosts())
		console.log('store state after fetchPosts: ' + store.getState())
	},

	componentWillUnmount(){

	},

	render(){
		return (
			<div>
				{ this.state.posts.map( post => {
					return <Post key={post.id} n={post.name} t={post.text} />
				}) }
			</div>
			
		)
	}
});

export default Posts
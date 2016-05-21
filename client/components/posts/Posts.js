import React, { Component } from 'react'
import Post from '../post/Post'

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
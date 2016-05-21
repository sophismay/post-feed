import React, { Component } from 'react'
import Post from '../post/Post'

let Posts = new React.createClass({

	getInitialState(){
		return {
			posts: [{
				text: 'Some text here',
				name: 'user one'
			},
			{
				text: 'Another text here',
				name: 'user two'
			}]
		}
	},

	render(){
		return (
			<div>
				{this.state.posts.map( post => {
					<Post name={post.name} text={post.text} />
				})}
			</div>
		)
	}
});

export default Posts
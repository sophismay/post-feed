import React, { Component } from 'react'

let Post = new React.createClass({
	render(){
		<div>
			{ this.props.name }
			<p/>
			{ this.props.text }
		</div>
	}
});

export default Post
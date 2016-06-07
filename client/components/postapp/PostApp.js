import React, { Component } from 'react'

let PostApp = new React.createClass({

	render(){
		return (
			<div>
				{ this.props.children }
			</div>
		)
	}
})

export default PostApp
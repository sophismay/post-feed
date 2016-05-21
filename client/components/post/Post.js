import React, { Component } from 'react'

let Post = new React.createClass({
	render(){
		return (
			<div>
				<h3>{ this.props.n } </h3>
				<p/>
				<h3> { this.props.t } </h3>
			</div>
		)
	}
});

export default Post
import React, { Component } from 'react'

let Post = new React.createClass({
	render(){
		return (
			<div className='post-container'>
				<h5><b>{ this.props.n }</b> </h5>
				<p/>
				<h5> { this.props.t } </h5>
				<p/>
				
			</div>
		)
	}
});

export default Post
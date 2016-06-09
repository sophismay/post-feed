'use strict';

import Post from './post.model';

const create = (req, res, next) => {
	console.log('post create called: ' + JSON.stringify(req.body));
	console.log('user: ' + JSON.stringify(Object.keys(req.body.user)))
  	let post = new Post(req.body);
  	post.created_at = Date.now()
  	post.save( (err) => {
  		if(err) {
  			console.log('error saving: ' + err.toString())
  			return res.status(400).json({err: err})
  		}

  		return res.status(200).json(post)	
  	})
}

const show = (req, res, next) => {
	console.log('show called ')
	// populate posts with users
	Post.find({}, (err, posts) => {
		if(err) return res.status(400).json({err: err})
		if(!posts) return res.status(404).json()
		
		return res.status(200).json(posts)	
	})
}

exports.create = create
exports.show = show
'use strict';

import Post from './post.model';

const create = (req, res, next) => {
	console.log('post create called');
  	let post = new Post(req.body);
  	post.save( (err) => {
  		if(err) return res.status(401).json({err: err.toString()})

  		return res.status(200).json(post)	
  	})
}

exports.create = create
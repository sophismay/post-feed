'use strict';

import Post from './post.model';

const handleError = (res, err = null, status = 500) => {
	return res.status(status).json(err)
}

const create = (req, res, next) => {
	console.log('post create called: ' + JSON.stringify(req.body));
	console.log('user: ' + JSON.stringify(Object.keys(req.body.user)))
  	let post = new Post(req.body);
  	post.created_at = Date.now()
  	post.comments = []
  	post.save( (err) => {
  		if(err) {
  			console.log('error saving: ' + err.toString())
  			return handleError(res, { err: err }, 400)
  		}

  		return res.status(200).json(post)	
  	})
}

const show = (req, res, next) => {
	console.log('show called ')
	// populate posts with users
	Post.find({}, (err, posts) => {
		if(err) return handleError(res, { err: err }, 400)
		if(!posts) return handleError(res, { err: err }, 404)
		
		return res.status(200).json(posts)	
	})
}

const reply = (req, res, next) => {
	console.log('reply called ' + req.params.postId)
	let postId = req.params.postId
	Post.findById(postId, (err, post) => {
		if(err) return handleError(res, { err: err }, 400)
		if(!post) return handleError(res, { err: err }, 404)

		// populate post comments	
	})
}

exports.create = create
exports.show = show
exports.reply = reply
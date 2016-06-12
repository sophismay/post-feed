'use strict';

import Post from './post.model';

const handleError = (res, err = null, status = 500) => {
	return res.status(status).json(err)
}

const create = (req, res, next) => {
  	let post = new Post(req.body);
  	post.created_at = Date.now()
  	post.comments = []
  	post.save( (err) => {
  		if(err) {
  			return handleError(res, { err: err }, 400)
  		}

  		return res.status(200).json(post)	
  	})
}

const show = (req, res, next) => {
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

		// add comments to post
		let commentData = {
			comment: req.body.comment,
			name: req.body.name
		}
		Object.assign(post, post, post.comments = [
				...post.comments, commentData
			])
		post.save( (err) => {
			if(err) return handleError(res, { err: err }, 400)
			return res.status(201).json(post)	
		})
	})
}

exports.create = create
exports.show = show
exports.reply = reply